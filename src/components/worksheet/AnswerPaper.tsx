'use client';

import React from 'react';
import { Problem } from '@/lib/math-engine/types';

interface AnswerPaperProps {
  ansPageChunk: Problem[];
  ansPageIndex: number;
  totalAnswerPages: number;
  fullWorksheetData: Problem[];
  activePaperTitle: string;
  activeUnitTitle: string;
}

export function AnswerPaper({
  ansPageChunk,
  ansPageIndex,
  totalAnswerPages,
  fullWorksheetData,
  activePaperTitle,
  activeUnitTitle,
}: AnswerPaperProps) {
  // 🎯 判斷這組解答頁中是否包含「長答案」（如應用題或代數列式，長度超過 8 個字）
  const hasLongAnswer = ansPageChunk.some(
    (p) => String(p.answer || '').length > 8
  );

  return (
    <div
      className="pdf-page-wrapper bg-white rounded-xl shadow-neu-extruded print:shadow-none print:rounded-none py-[10mm] px-[12mm] flex flex-col justify-between box-border border-t-4 border-neu-primary print:border-none"
      style={{
        width: '210mm',
        height: '297mm',
        margin: '0 auto',
        boxSizing: 'border-box',
      }}
    >
      <div className="flex-1 flex flex-col justify-start">
        <header className="w-full mb-4">
          <div className="flex justify-between items-end w-full pb-2">
            <div>
              <h2 className="text-2xl font-display font-bold text-red-600 leading-normal pb-1 flex items-center gap-2">
                <span>{activePaperTitle}_解答</span>
                <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded font-normal print:hidden">
                  教師專用頁
                </span>
              </h2>
              <p className="text-xs text-gray-600 leading-normal pt-1">
                單元：{activeUnitTitle}
              </p>
            </div>
          </div>
          <hr className="border-t-2 border-red-500 w-full my-0" />
        </header>

        {/* 🎯 根據答案長度動態切換：短答案用 4 欄，長答案改用 2 欄或 1 欄 */}
        <div
          className={`grid ${
            hasLongAnswer
              ? 'grid-cols-2 gap-x-8 gap-y-3 font-sans'
              : 'grid-cols-4 print-grid-ans-4col gap-x-6 gap-y-1.5 font-mono'
          } text-sm`}
        >
          {ansPageChunk.map((prob) => {
            const probIndex =
              fullWorksheetData.findIndex((p) => p.id === prob.id) + 1;
            const isLong = String(prob.answer || '').length > 8;

            return (
              <div
                key={`ans-${prob.id}`}
                className={`flex ${
                  isLong ? 'items-start' : 'items-baseline'
                } gap-2 border-b border-gray-100 pb-1.5`}
              >
                <span className="font-bold text-gray-400 text-xs w-7 text-right shrink-0 pt-0.5">
                  {probIndex}.
                </span>
                {/* 🎯 移除 truncate，加入 break-words 確保長算式/解答自動換行不溢出 */}
                <span className="font-bold text-red-600 text-base tracking-tight break-words flex-1">
                  {prob.answer}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <footer className="pt-2 border-t border-gray-200 text-center text-xs text-gray-400 font-medium shrink-0 mt-2 leading-normal">
        解答頁 ({ansPageIndex + 1} / {totalAnswerPages})
      </footer>
    </div>
  );
}