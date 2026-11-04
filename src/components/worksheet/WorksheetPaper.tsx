'use client';

import React from 'react';
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';
import { Problem } from '@/lib/math-engine/types';
import { MathProblemRenderer } from '@/components/worksheet/MathProblemRenderer';
import { SortableItem } from '@/components/worksheet/SortableItem';

interface WorksheetPaperProps {
  pageProblems: Problem[];
  pageIndex: number;
  totalPages: number;
  itemsPerPage: number;
  activePaperTitle: string;
  activeUnitTitle: string;
  activeIsWordProblem: boolean;
  layoutPref: 'horizontal' | 'vertical';
  spacingFactor: number;
  showBopomofo: boolean;
  onRegenerateSingle: (id: string) => void;
  onUpdateProblem: (id: string, updatedProps: Partial<Problem>) => void;
}

export function WorksheetPaper({
  pageProblems,
  pageIndex,
  totalPages,
  itemsPerPage,
  activePaperTitle,
  activeUnitTitle,
  activeIsWordProblem,
  layoutPref,
  spacingFactor,
  showBopomofo,
  onRegenerateSingle,
  onUpdateProblem,
}: WorksheetPaperProps) {
  return (
    <div
      className="pdf-page-wrapper bg-white rounded-xl shadow-neu-extruded print:shadow-none print:rounded-none py-[10mm] px-[12mm] flex flex-col justify-between box-border transition-all duration-150"
      style={{
        width: '210mm',
        height: '297mm',
        margin: '0 auto',
        boxSizing: 'border-box',
      }}
    >
      <div className="flex-1 flex flex-col justify-start overflow-hidden">
        {pageIndex === 0 ? (
          <header className="w-full mb-6">
            <div className="flex justify-between items-end w-full pb-2">
              <div className="flex-1 pr-4">
                <h2 className="text-2xl sm:text-3xl font-display font-bold text-black tracking-wide leading-normal pb-1">
                  {activePaperTitle}
                </h2>
                <p className="text-xs text-gray-600 leading-normal pt-1">
                  單元：{activeUnitTitle}
                </p>
              </div>

              <div className="text-sm text-black font-medium flex items-center gap-x-3 shrink-0 pb-1">
                <span>班級：＿＿＿</span>
                <span>姓名：＿＿＿＿</span>
                <span>座號：＿＿</span>
              </div>
            </div>
            <hr className="border-t-2 border-gray-800 w-full my-0" />
          </header>
        ) : (
          <header className="w-full mb-4">
            <div className="flex justify-between items-center w-full pb-2">
              <h3 className="text-base font-bold text-gray-700 leading-normal">
                {activePaperTitle}
              </h3>
              <p className="text-xs text-gray-500 font-medium leading-normal">
                單元：{activeUnitTitle}
              </p>
            </div>
            <hr className="border-t-2 border-gray-300 w-full my-0" />
          </header>
        )}

        <SortableContext
          items={pageProblems.map((p) => p.id)}
          strategy={rectSortingStrategy}
        >
          <div
            className={`grid gap-x-6 pl-6 ${
              activeIsWordProblem
                ? 'grid-cols-1'
                : layoutPref === 'vertical'
                ? 'grid-cols-4 print-grid-v'
                : 'grid-cols-2'
            }`}
          >
            {pageProblems.map((problem, idx) => {
              const absoluteIndex = pageIndex * itemsPerPage + idx + 1;
              return (
                <SortableItem key={problem.id} id={problem.id}>
                  <MathProblemRenderer
                    index={absoluteIndex}
                    problem={problem}
                    showAnswer={false}
                    layoutPref={layoutPref}
                    spacingFactor={spacingFactor}
                    showBopomofo={showBopomofo}
                    onRegenerate={onRegenerateSingle}
                    onUpdateProblem={onUpdateProblem}
                  />
                </SortableItem>
              );
            })}
          </div>
        </SortableContext>
      </div>

      <footer className="pt-2 border-t border-gray-200 text-center text-xs text-gray-500 font-medium shrink-0 mt-2 leading-normal">
        【 提示程度 : ☐ 獨立完成 ☐ 口語提示 ☐ 視覺提示 ☐ 完全協助 】  第 {pageIndex + 1} 頁，共 {totalPages} 頁  
      </footer>
    </div>
  );
}