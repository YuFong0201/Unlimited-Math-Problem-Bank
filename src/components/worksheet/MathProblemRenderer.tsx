'use client';

import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Problem } from '@/lib/math-engine/types';
import { BOPOMOFO_OPTIONS_MAP } from '@/lib/bopomofo/dictionary';

function BopomofoWord({
  char,
  baseBopomofoClass,
}: {
  char: string;
  baseBopomofoClass: string;
}) {
  const entry = BOPOMOFO_OPTIONS_MAP[char];

  const defaultClass =
    entry?.defaultClassSuffix ?? entry?.options?.[0]?.classSuffix ?? '';

  const [activeClass, setActiveClass] = useState<string>(defaultClass);
  const [isOpen, setIsOpen] = useState(false);
  const [coords, setCoords] = useState<{ top: number; left: number }>({ top: 0, left: 0 });
  const [isMounted, setIsMounted] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (entry) {
      setActiveClass(entry.defaultClassSuffix ?? entry.options?.[0]?.classSuffix ?? '');
    }
  }, [entry]);

  if (!entry || !entry.options || entry.options.length === 0) {
    return <span className={baseBopomofoClass}>{char}</span>;
  }

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setCoords({
        top: rect.top + window.scrollY - 8,
        left: rect.left + window.scrollX + rect.width / 2,
      });
    }
    setIsOpen((prev) => !prev);
  };

  const handleSelectOption = (e: React.MouseEvent, classSuffix: string) => {
    e.stopPropagation();
    setActiveClass(classSuffix);
    setIsOpen(false);
  };

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        onClick={handleToggle}
        className={`${baseBopomofoClass} ${activeClass} inline-block cursor-pointer rounded px-0.5 transition-colors hover:bg-amber-200 print:hover:bg-transparent border-b border-dashed border-amber-500 print:border-none focus:outline-none`}
        title="點擊切換注音讀音"
      >
        {char}
      </button>

      {isOpen && isMounted &&
        createPortal(
          <>
            <div
              className="fixed inset-0 z-[9998] print:hidden cursor-default"
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(false);
              }}
            />
            <div
              style={{
                position: 'absolute',
                top: `${coords.top}px`,
                left: `${coords.left}px`,
                transform: 'translate(-50%, -100%)',
              }}
              className="z-[9999] min-w-[150px] bg-white border border-amber-300 rounded-lg shadow-2xl py-1 text-xs print:hidden animate-in fade-in zoom-in-95 duration-100"
            >
              <div className="px-2.5 py-1 text-[11px] text-gray-500 font-bold border-b border-gray-100 bg-amber-50/80">
                選擇「{char}」的注音：
              </div>
              
              {entry.options.map((opt, i) => {
                const isSelected = activeClass === opt.classSuffix;

                return (
                  <button
                    key={`${i}-${opt.classSuffix}`}
                    type="button"
                    onClick={(e) => handleSelectOption(e, opt.classSuffix)}
                    className={`w-full text-left px-2.5 py-1.5 hover:bg-amber-100 transition-colors flex items-center justify-between ${
                      isSelected ? 'font-bold text-amber-700 bg-amber-50' : 'text-gray-700'
                    }`}
                  >
                    <span>{opt.label}</span>
                    {isSelected && <span className="text-xs font-bold text-amber-600">✓</span>}
                  </button>
                );
              })}
            </div>
          </>,
          document.body
        )}
    </>
  );
}

interface RendererProps {
  problem: Problem;
  showAnswer: boolean;
  layoutPref: 'horizontal' | 'vertical';
  spacingFactor?: number;
  index: number;
  showBopomofo?: boolean;
  onRegenerate?: (id: string) => void;
  onUpdateProblem?: (id: string, updated: Partial<Problem>) => void;
}

export function MathProblemRenderer({
  problem,
  showAnswer,
  layoutPref,
  spacingFactor = 100,
  index,
  showBopomofo = false,
  onRegenerate,
  onUpdateProblem,
}: RendererProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editExpression, setEditExpression] = useState(problem.expression);
  const [editAnswer, setEditAnswer] = useState(problem.answer);

  const isWordProblem =
    problem.operator === 'word-problem' ||
    problem.operator === 'word' ||
    problem.id.includes('WORD') ||
    problem.id.includes('NUM') ||
    problem.meta?.isWordProblem === true ||
    problem.meta?.layout === 'word';

  const isFraction = problem.meta?.type === 'fraction';
  const isMultiplication =
    problem.operator === 'multiply' ||
    problem.expression.includes('×') ||
    problem.expression.includes('*');

  const handleSaveEdit = () => {
    if (onUpdateProblem) {
      onUpdateProblem(problem.id, { expression: editExpression, answer: editAnswer });
    }
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditExpression(problem.expression);
    setEditAnswer(problem.answer);
    setIsEditing(false);
  };

  // 支援包含小數點加減乘除算式的正規表達式
  const matchNormal = problem.expression.match(/^([\d.]+)\s*([\+\-\×\*])\s*([\d.]+)\s*=/);
  // 🎯 支援整數與小數除法
  const matchDiv = problem.expression.match(/^([\d.]+)\s*([÷\/])\s*([\d.]+)\s*=/);

  const baseMarginRem = isMultiplication ? 3.75 : 1.75;
  const calculatedMarginPx = Math.round((baseMarginRem * (spacingFactor / 100)) * 16);

  const dynamicMarginStyle = {
    marginBottom: `${calculatedMarginPx}px`,
  };

  // 🎯 修正：補上原本遺漏的乘號 *
  const dynamicWordSpaceStyle = {
    height: `${Math.round(120 * (spacingFactor / 100))}px`,
  };

  const baseBopomofoClass = showBopomofo ? 'font-bopomofo' : '';

  const renderText = (text: string) => {
    if (!text) return null;
    if (!showBopomofo) return text;

    const chars = Array.from(text);

    return (
      <span>
        {chars.map((char, i) => (
          <BopomofoWord
            key={`${i}-${char}`}
            char={char}
            baseBopomofoClass={baseBopomofoClass}
          />
        ))}
      </span>
    );
  };

  // 輔助函式：解析分子或分母內容，若為 _、( ) 或 () 則渲染成美麗對齊的挖空括號
  const renderFractionPart = (rawStr: string) => {
    const trimmed = rawStr.trim();
    if (trimmed === '_' || trimmed === '( )' || trimmed === '()') {
      return (
        <span className="font-sans px-1 text-gray-700 font-bold inline-block">
          (&nbsp;&nbsp;&nbsp;)
        </span>
      );
    }
    return renderText(rawStr);
  };

  return (
    <div className="relative group/problem w-full max-w-full overflow-hidden break-inside-avoid print:break-inside-avoid page-break-inside-avoid">
      {!isEditing && (
        <div className="absolute -top-3 right-0 opacity-0 group-hover/problem:opacity-100 transition-opacity flex items-center gap-1 bg-white/90 backdrop-blur shadow-sm border rounded-lg px-1.5 py-0.5 text-xs print:hidden z-10">
          {onRegenerate && (
            <button
              onClick={() => onRegenerate(problem.id)}
              className="p-1 hover:text-neu-primary transition-colors flex items-center gap-1"
              title="單獨重抽這題"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M21.5 2v6h-6M2.5 22v-6h6"/>
                <path d="M2 11.5a10 10 0 0 1 18.8-4.3L21.5 8M22 12.5a10 10 0 0 1-18.8 4.2L2.5 16"/>
              </svg>
              換一題
            </button>
          )}
          <span className="text-gray-300">|</span>
          {onUpdateProblem && (
            <button
              onClick={() => setIsEditing(true)}
              className="p-1 hover:text-neu-primary transition-colors flex items-center gap-1"
              title="手動修改"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 20h9"/>
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
              </svg>
              修改
            </button>
          )}
        </div>
      )}

      {isEditing ? (
        <div className="p-3 bg-neu-base rounded-xl border border-neu-primary/40 space-y-2 text-sm print:hidden">
          <div>
            <label className="text-xs text-neu-muted block font-bold mb-1">題目算式：</label>
            <input
              type="text"
              value={editExpression}
              maxLength={200}
              onChange={(e) => setEditExpression(e.target.value)}
              className="w-full px-2 py-1 rounded border border-gray-300 font-sans focus:outline-none"
            />
          </div>
          <div>
            <label className="text-xs text-neu-muted block font-bold mb-1">解答：</label>
            <input
              type="text"
              value={editAnswer}
              maxLength={100}
              onChange={(e) => setEditAnswer(e.target.value)}
              className="w-full px-2 py-1 rounded border border-gray-300 font-sans focus:outline-none"
            />
          </div>
          <div className="flex justify-end gap-2 pt-1">
            <button onClick={handleCancelEdit} className="px-2 py-1 text-xs text-gray-500">取消</button>
            <button onClick={handleSaveEdit} className="px-2 py-1 text-xs bg-neu-primary text-white font-bold rounded">儲存</button>
          </div>
        </div>
      ) : (
        <div className="w-full max-w-full">
          {/* 1. 應用題 */}
          {isWordProblem && (
            <div className="w-full flex flex-col text-xl font-body relative z-0 mb-2 break-inside-avoid print:break-inside-avoid">
              <div className="flex items-start gap-3 leading-relaxed w-full min-w-0">
                <span className="font-bold text-gray-500 shrink-0 text-lg pt-0.5">{index}.</span>
                <div className={`flex-1 text-gray-900 font-medium tracking-wide w-full min-w-0 break-words whitespace-pre-wrap ${baseBopomofoClass}`}>
                  {renderText(problem.expression)}
                </div>
              </div>

              {/* 🎯 應用題解答區塊：自動換行、防止長字串溢出 */}
              {showAnswer && (
                <div className="mt-2 ml-8 text-red-500 font-bold text-lg font-sans break-words whitespace-pre-wrap">
                  答：{problem.answer}
                </div>
              )}

              <div style={dynamicWordSpaceStyle} className="w-full transition-all duration-100" />
            </div>
          )}

          {/* 2. 分數 (優化：括號防錯位保護) */}
          {isFraction && (
            <div 
              style={dynamicMarginStyle}
              className={`flex items-center gap-3 text-2xl font-body whitespace-nowrap select-none break-inside-avoid print:break-inside-avoid transition-all duration-100 max-w-full overflow-hidden ${baseBopomofoClass}`}
            >
              <span className="text-gray-500 font-bold text-lg w-6 shrink-0">{index}.</span>
              <div className="flex items-center gap-2.5 flex-wrap">
                {problem.expression.split(' ').map((part, i) => {
                  if (part.includes('/')) {
                    const [num, den] = part.split('/');
                    return (
                      <div key={i} className="inline-flex flex-col items-center justify-center min-w-[28px] mx-0.5">
                        <span className="text-center block w-full leading-none text-xl font-medium pb-1">
                          {renderFractionPart(num)}
                        </span>
                        <div className="w-full h-[2px] bg-black shrink-0 my-0.5"></div>
                        <span className="text-center block w-full leading-none text-xl font-medium pt-1">
                          {renderFractionPart(den)}
                        </span>
                      </div>
                    );
                  }
                  return (
                    <span key={i} className="inline-block leading-none text-2xl font-medium px-0.5">
                      {renderText(part)}
                    </span>
                  );
                })}

                {showAnswer && (
                  <span className="text-red-500 font-bold text-xl ml-2 shrink-0">
                    ({problem.answer})
                  </span>
                )}
              </div>
            </div>
          )}

          {/* 3. 一般算式（橫式、直式） */}
          {!isWordProblem && !isFraction && (
            <div className="break-inside-avoid print:break-inside-avoid w-full max-w-full">
              {layoutPref === 'vertical' ? (
                (() => {
                  if (matchDiv) {
                    const dividendStr = matchDiv[1];
                    const divisorStr = matchDiv[3];
                    const dividend = parseFloat(dividendStr);
                    const divisor = parseFloat(divisorStr);

                    // 🎯 自動調控小數除法字型：避免多位數小數被裁切
                    const maxCharLen = Math.max(dividendStr.length, divisorStr.length);
                    let fontSizeClass = 'text-xl sm:text-2xl';
                    let divisorFontSize = 'text-lg sm:text-xl';

                    if (maxCharLen >= 6) {
                      fontSizeClass = 'text-base sm:text-lg';
                      divisorFontSize = 'text-sm sm:text-base';
                    } else if (maxCharLen >= 4 || dividendStr.includes('.')) {
                      fontSizeClass = 'text-lg sm:text-xl';
                      divisorFontSize = 'text-base sm:text-lg';
                    }

                    let displayQuotient = '';
                    if (showAnswer) {
                      const qMatch = String(problem.answer).match(/^[\d.]+/);
                      displayQuotient = qMatch ? qMatch[0] : problem.answer;
                    }

                    const product = showAnswer ? (Math.floor(dividend / divisor) * divisor).toString() : '';
                    const remainder = showAnswer ? (dividend % divisor).toString() : '';

                    return (
                      <div 
                        style={dynamicMarginStyle}
                        className="flex items-start gap-1 select-none break-inside-avoid print:break-inside-avoid transition-all duration-100 max-w-full overflow-visible"
                      >
                        <span className="text-gray-500 font-bold text-sm sm:text-base w-6 shrink-0 text-right pt-6 font-sans">
                          {index}.
                        </span>
                        <div className={`flex flex-col items-end ${fontSizeClass} font-sans font-bold leading-none [font-variant-numeric:tabular-nums] shrink-0`}>
                          {/* 商數 */}
                          <div className={`h-6 flex items-end pr-1.5 leading-none ${showAnswer ? 'text-red-500 font-bold' : 'invisible'}`}>
                            {displayQuotient}
                          </div>
                          {/* 除號與被除數 */}
                          <div className="flex items-center leading-none">
                            <span className={`font-sans ${divisorFontSize} font-bold pr-1 inline-block leading-none shrink-0`}>
                              {divisorStr}
                            </span>
                            <div className="border-t-2 border-l-2 border-black rounded-tl-lg pl-2 pr-1.5 py-1 leading-none whitespace-nowrap">
                              {dividendStr}
                            </div>
                          </div>
                          {/* 過程與餘數 */}
                          <div className={`flex flex-col items-end w-full leading-none ${showAnswer ? 'text-red-500 font-bold' : 'invisible'}`}>
                            <div className="pr-1.5 pt-1 leading-none">{product}</div>
                            <div className="pr-1.5 pt-1 leading-none">{remainder}</div>
                          </div>
                        </div>
                      </div>
                    );
                  }

                  if (matchNormal) {
                    const [_, num1Raw, operator, num2Raw] = matchNormal;

                    const getParts = (str: string) => {
                      const s = String(str || '').trim();
                      if (!s) return { intP: '0', decP: '', hasDec: false };
                      const [intP = '0', decP = ''] = s.split('.');
                      return { intP, decP, hasDec: s.includes('.') };
                    };

                    const p1 = getParts(num1Raw);
                    const p2 = getParts(num2Raw);
                    const pAns = getParts(problem.answer);

                    const hasDecimal = p1.hasDec || p2.hasDec || pAns.hasDec;

                    const maxIntLen = Math.max(p1.intP.length, p2.intP.length, pAns.intP.length, 1);
                    const maxDecLen = Math.max(p1.decP.length, p2.decP.length, pAns.decP.length, 0);
                    const totalChars = maxIntLen + (hasDecimal ? maxDecLen + 1 : 0);

                    let fontSizeClass = 'text-2xl sm:text-3xl';
                    if (totalChars >= 6) {
                      fontSizeClass = 'text-lg sm:text-xl';
                    } else if (totalChars >= 5 || isMultiplication) {
                      fontSizeClass = 'text-xl sm:text-2xl';
                    }

                    return (
                      <div 
                        style={dynamicMarginStyle}
                        className="flex items-start gap-1 select-none break-inside-avoid print:break-inside-avoid transition-all duration-100 max-w-full overflow-hidden"
                      >
                        <span className="text-gray-500 font-bold text-sm sm:text-base w-6 shrink-0 text-right pt-0.5 font-sans">
                          {index}.
                        </span>

                        <div className={`inline-grid ${hasDecimal ? 'grid-cols-[auto_auto_auto_auto]' : 'grid-cols-[auto_auto]'} items-center ${fontSizeClass} font-sans font-bold leading-none [font-variant-numeric:tabular-nums]`}>
                          {/* 第一行 */}
                          <span className="text-center pr-1">{'\u00A0'}</span>
                          <span className="text-right">{p1.intP}</span>
                          {hasDecimal && (
                            <>
                              <span className="text-center px-[0.5px] font-bold">.</span>
                              <span className="text-left">{p1.decP}</span>
                            </>
                          )}

                          {/* 第二行 */}
                          <span className="text-center pr-1 font-sans font-bold">{operator}</span>
                          <span className="text-right">{p2.intP}</span>
                          {hasDecimal && (
                            <>
                              <span className="text-center px-[0.5px] font-bold">.</span>
                              <span className="text-left">{p2.decP}</span>
                            </>
                          )}

                          {/* 橫線 */}
                          <div className="col-span-full w-full h-[2px] bg-black my-1 shrink-0" />

                          {/* 第三行：解答 */}
                          <span className={`text-center pr-1 ${showAnswer ? 'text-red-500' : 'invisible'}`}>
                            {'\u00A0'}
                          </span>
                          <span className={`text-right ${showAnswer ? 'text-red-500' : 'invisible'}`}>
                            {pAns.intP}
                          </span>
                          {hasDecimal && (
                            <>
                              <span className={`text-center px-[0.5px] font-bold ${showAnswer ? 'text-red-500' : 'invisible'}`}>
                                .
                              </span>
                              <span className={`text-left ${showAnswer ? 'text-red-500' : 'invisible'}`}>
                                {pAns.decP}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    );
                  }

                  return (
                    <div 
                      style={dynamicMarginStyle}
                      className={`flex items-start gap-3 text-2xl font-body whitespace-nowrap select-none break-inside-avoid print:break-inside-avoid transition-all duration-100 ${baseBopomofoClass}`}
                    >
                      <span className="text-gray-500 font-bold text-lg w-6 shrink-0">{index}.</span>
                      <div className="flex-1 flex gap-2 items-baseline max-w-full overflow-hidden">
                        <span className={baseBopomofoClass}>{renderText(problem.expression)}</span>
                        <span className="font-bold border-b-2 border-black inline-block min-w-[80px] max-w-[120px] flex-1">&nbsp;</span>
                      </div>
                    </div>
                  );
                })()
              ) : (
                <div 
                  style={dynamicMarginStyle}
                  className={`flex items-start gap-3 text-2xl font-body whitespace-nowrap select-none break-inside-avoid print:break-inside-avoid transition-all duration-100 ${baseBopomofoClass}`}
                >
                  <span className="text-gray-500 font-bold text-lg w-6 shrink-0">{index}.</span>
                  <div className="flex-1 flex gap-2 items-baseline max-w-full overflow-hidden">
                    <span className={baseBopomofoClass}>{renderText(problem.expression)}</span>
                    <span className="font-bold border-b-2 border-black inline-block min-w-[80px] max-w-[120px] flex-1">&nbsp;</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}