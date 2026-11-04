'use client';

import React from 'react';
import { NeuCard } from '@/components/ui/NeuCard';
import { NeuSelect } from '@/components/ui/NeuSelect';
import { NeuButton } from '@/components/ui/NeuButton';
import { NeuToggle } from '@/components/ui/NeuToggle';
import { getGradeLabel } from '@/utils/worksheetHelpers';

interface UnitOption {
  id: string;
  title: string;
}

interface WorksheetFormProps {
  availableUnits: UnitOption[];
  selectedUnit: string;
  setSelectedUnit: (val: string) => void;
  paperTitle: string;
  setPaperTitle: (val: string) => void;
  questionCount: number;
  setQuestionCount: (val: number) => void;
  layoutPref: 'horizontal' | 'vertical';
  setLayoutPref: (val: 'horizontal' | 'vertical') => void;
  spacingFactor: number;
  setSpacingFactor: (val: number) => void;
  showAnswers: boolean;
  setShowAnswers: (val: boolean) => void;
  showBopomofo: boolean;
  setShowBopomofo: (val: boolean) => void;
  isVerticalSupported: boolean;
  hasWorksheetData: boolean;
  onGenerate: () => void;
  onPrintOrExport: () => void;
}

export function WorksheetForm({
  availableUnits,
  selectedUnit,
  setSelectedUnit,
  paperTitle,
  setPaperTitle,
  questionCount,
  setQuestionCount,
  layoutPref,
  setLayoutPref,
  spacingFactor,
  setSpacingFactor,
  showAnswers,
  setShowAnswers,
  showBopomofo,
  setShowBopomofo,
  isVerticalSupported,
  hasWorksheetData,
  onGenerate,
  onPrintOrExport,
}: WorksheetFormProps) {
  return (
    <div className="max-w-3xl mx-auto space-y-6 sm:space-y-12 print:hidden">
      <div className="text-center space-y-2 sm:space-y-4">
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-display font-extrabold tracking-tight text-neu-text">
          國小數學無限題庫
        </h1>
        <p className="text-xs sm:text-base text-neu-muted font-medium">
          基於 108 課綱指標設計，隨機產生基礎計算練習題
        </p>
      </div>

      <NeuCard>
        <div className="space-y-6 sm:space-y-8">
          <div className="space-y-2 sm:space-y-3">
            <label className="text-xs sm:text-sm font-bold text-neu-muted pl-2 sm:pl-4 block">
              試卷名稱（選填）
            </label>
            <input
              type="text"
              value={paperTitle}
              onChange={(e) => setPaperTitle(e.target.value)}
              placeholder="預設：數學學習單"
              className="w-full h-12 sm:h-14 px-4 sm:px-6 bg-neu-base text-sm sm:text-base text-neu-text rounded-2xl shadow-neu-inset-deep outline-none focus:ring-2 focus:ring-neu-primary transition-all duration-300 placeholder:text-neu-muted/50"
            />
          </div>

          <NeuSelect
            label="選擇單元與題型"
            value={selectedUnit}
            onChange={(e) => setSelectedUnit(e.target.value)}
          >
            {availableUnits.map((unit) => (
              <option key={unit.id} value={unit.id}>
                {getGradeLabel(unit.id)} {unit.title}
              </option>
            ))}
          </NeuSelect>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <div className="space-y-2 sm:space-y-3">
              <label className="text-xs sm:text-sm font-bold text-neu-muted pl-2 sm:pl-4 block">
                題數: {questionCount} 題
              </label>
              <div className="flex items-center h-12 sm:h-14 px-4 sm:px-6 bg-neu-base rounded-2xl shadow-neu-inset">
                <input
                  type="range"
                  min="5"
                  max="50"
                  step="1"
                  value={questionCount}
                  onChange={(e) => setQuestionCount(Number(e.target.value))}
                  className="w-full accent-neu-primary cursor-pointer"
                />
              </div>
            </div>

            <div className="space-y-2 sm:space-y-3">
              <div className="flex justify-between items-center pl-2 sm:pl-4 pr-1">
                <label className="text-xs sm:text-sm font-bold text-neu-muted block">計算方式</label>
                {!isVerticalSupported && (
                  <span className="text-[10px] sm:text-xs text-neu-muted/70 font-medium">
                    （此單元僅支援橫式）
                  </span>
                )}
              </div>
              <div className="flex bg-neu-base rounded-2xl shadow-neu-inset-deep p-1 h-12 sm:h-14">
                <button
                  type="button"
                  onClick={() => setLayoutPref('horizontal')}
                  className={`flex-1 text-xs sm:text-sm rounded-xl font-bold transition-all duration-300 ${
                    layoutPref === 'horizontal'
                      ? 'bg-neu-base shadow-neu-extruded text-neu-primary'
                      : 'text-neu-muted hover:text-neu-text'
                  }`}
                >
                  橫式
                </button>

                <button
                  type="button"
                  onClick={() => isVerticalSupported && setLayoutPref('vertical')}
                  disabled={!isVerticalSupported}
                  title={!isVerticalSupported ? '此單元僅提供橫式排版' : '切換為直式算式'}
                  className={`flex-1 text-xs sm:text-sm rounded-xl font-bold transition-all duration-300 ${
                    !isVerticalSupported
                      ? 'opacity-35 text-gray-400 cursor-not-allowed'
                      : layoutPref === 'vertical'
                      ? 'bg-neu-base shadow-neu-extruded text-neu-primary'
                      : 'text-neu-muted hover:text-neu-text'
                  }`}
                >
                  直式
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-2 sm:space-y-3">
            <div className="flex justify-between items-center pl-2 sm:pl-4 pr-1">
              <label className="text-xs sm:text-sm font-bold text-neu-muted block">
                每題間隔高度：<span className="text-neu-primary font-mono">{spacingFactor}%</span>
              </label>
              <button
                type="button"
                onClick={() => setSpacingFactor(100)}
                className="text-xs text-neu-muted hover:text-neu-primary underline transition-colors"
              >
                重設預設 (100%)
              </button>
            </div>
            <div className="flex items-center h-12 sm:h-14 px-4 sm:px-6 bg-neu-base rounded-2xl shadow-neu-inset">
              <input
                type="range"
                min="50"
                max="400"
                step="10"
                value={spacingFactor}
                onChange={(e) => setSpacingFactor(Number(e.target.value))}
                className="w-full accent-neu-primary cursor-pointer"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <div className="space-y-2 sm:space-y-3">
              <label className="text-xs sm:text-sm font-bold text-neu-muted pl-2 sm:pl-4 block">解答頁</label>
              <div className="h-12 sm:h-14 flex items-center">
                <NeuToggle
                  label="附帶解答頁"
                  checked={showAnswers}
                  onChange={setShowAnswers}
                  color="success"
                />
              </div>
            </div>

            <div className="space-y-2 sm:space-y-3">
              <label className="text-xs sm:text-sm font-bold text-neu-muted pl-2 sm:pl-4 block">
                注音字體
              </label>
              <div className="h-12 sm:h-14 flex items-center">
                <NeuToggle
                  label="使用注音標楷體"
                  checked={showBopomofo}
                  onChange={setShowBopomofo}
                />
              </div>
            </div>
          </div>

          <div className="pt-2 sm:pt-4 flex flex-col sm:flex-row gap-3 sm:gap-4">
            <div className="flex-1">
              <NeuButton onClick={onGenerate}>產生學習單</NeuButton>
            </div>

            {hasWorksheetData && (
              <div className="flex-1">
                <button
                  type="button"
                  onClick={onPrintOrExport}
                  className="w-full h-14 sm:h-16 bg-neu-success text-white font-bold rounded-2xl shadow-neu-extruded hover:-translate-y-[1px] active:translate-y-[0.5px] transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base cursor-pointer"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="6 9 6 2 18 2 18 9"></polyline>
                    <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
                    <rect x="6" y="14" width="12" height="8"></rect>
                  </svg>
                  <span>列印 / 下載 PDF</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </NeuCard>
    </div>
  );
}