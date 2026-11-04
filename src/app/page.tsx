'use client';

import { useState, useCallback, useEffect } from 'react';
import {
  DndContext,
  DragOverlay,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragEndEvent,
} from '@dnd-kit/core';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { motion } from 'framer-motion';

import { getAvailableUnits, generateWorksheet, generateSingleProblem } from '@/lib/math-engine';
import { Problem } from '@/lib/math-engine/types';
import { MathProblemRenderer } from '@/components/worksheet/MathProblemRenderer';

import { chunkArray, checkIsWordProblem } from '@/utils/worksheetHelpers';
import { getItemsPerPage } from '@/utils/layoutCalculator';
import { WorksheetForm } from '@/components/worksheet/WorksheetForm';
import { WorksheetPaper } from '@/components/worksheet/WorksheetPaper';
import { AnswerPaper } from '@/components/worksheet/AnswerPaper';

export default function WorksheetGenerator() {
  const availableUnits = getAvailableUnits() || [];
  const defaultUnit = availableUnits.length > 0 ? availableUnits[0].id : '';

  // Form States
  const [selectedUnit, setSelectedUnit] = useState<string>(defaultUnit);
  const [paperTitle, setPaperTitle] = useState<string>('');
  const [questionCount, setQuestionCount] = useState<number>(20);
  const [showAnswers, setShowAnswers] = useState<boolean>(false);
  const [layoutPref, setLayoutPref] = useState<'horizontal' | 'vertical'>('horizontal');
  const [spacingFactor, setSpacingFactor] = useState<number>(100);
  const [showBopomofo, setShowBopomofo] = useState<boolean>(false);

  // Active Generated States
  const [activePaperTitle, setActivePaperTitle] = useState<string>('');
  const [activeUnitTitle, setActiveUnitTitle] = useState<string>('');
  const [generatedUnitId, setGeneratedUnitId] = useState<string>('');
  const [worksheetData, setWorksheetData] = useState<Problem[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  // 🎯 直式支援判斷：包含 fra, FRA, FRAC (分數), WORD (應用題), MIX (混合題)
  const isWordProblemUnit = checkIsWordProblem(selectedUnit);
  const isFractionUnit = selectedUnit
    ? selectedUnit.toUpperCase().includes('FRA') || selectedUnit.toUpperCase().includes('FRAC')
    : false;
  const isMixedUnit = selectedUnit ? selectedUnit.toUpperCase().includes('MIX') : false;

  const isVerticalSupported = !isFractionUnit && !isWordProblemUnit && !isMixedUnit;

  // 注音字自動啟用邏輯
  useEffect(() => {
    const isLowerGrade = selectedUnit.startsWith('G1-') || selectedUnit.startsWith('G2-');
    const isWord = checkIsWordProblem(selectedUnit, worksheetData);
    setShowBopomofo(isLowerGrade && isWord);
  }, [selectedUnit, worksheetData]);

  // 不支援直式時自動切回橫式
  useEffect(() => {
    if (!isVerticalSupported && layoutPref === 'vertical') {
      setLayoutPref('horizontal');
    }
  }, [selectedUnit, isVerticalSupported, layoutPref]);

  // DnD Sensors
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleGenerate = () => {
    try {
      const targetUnit = selectedUnit || defaultUnit;
      if (!targetUnit) {
        alert('請先選擇單元！');
        return;
      }

      const problems = generateWorksheet(targetUnit, questionCount);
      const unitObj = availableUnits.find((u) => u.id === targetUnit);
      const unitTitle = unitObj?.title || '';
      const finalPaperTitle = paperTitle.trim() !== '' ? paperTitle.trim() : '數學學習單';

      setWorksheetData(problems || []);
      setGeneratedUnitId(targetUnit);
      setActivePaperTitle(finalPaperTitle);
      setActiveUnitTitle(unitTitle);
    } catch (error) {
      console.error('出題發生例外狀況：', error);
      alert('產生學習單時發生錯誤，請至 Console 檢視詳細資訊。');
    }
  };

  const handleRegenerateSingle = useCallback(
    (targetId: string) => {
      try {
        if (!generatedUnitId) return;
        const newProblem = generateSingleProblem(generatedUnitId);
        setWorksheetData((prev) =>
          prev.map((item) => (item.id === targetId ? { ...newProblem, id: targetId } : item))
        );
      } catch (error) {
        console.error('換題失敗:', error);
      }
    },
    [generatedUnitId]
  );

  const handleUpdateProblem = useCallback((targetId: string, updatedProps: Partial<Problem>) => {
    setWorksheetData((prev) =>
      prev.map((item) => (item.id === targetId ? { ...item, ...updatedProps } : item))
    );
  }, []);

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setWorksheetData((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
    setActiveId(null);
  };

  const currentUnitId = generatedUnitId || selectedUnit || '';
  const activeIsWordProblem = checkIsWordProblem(currentUnitId, worksheetData);

  const itemsPerPage = getItemsPerPage({
    unitId: currentUnitId,
    isWordProblem: activeIsWordProblem,
    spacingFactor,
    layoutPref,
  });

  const pages = chunkArray(worksheetData, itemsPerPage);
  const answerPages = chunkArray(worksheetData, 60);

  const handlePrintOrExport = () => {
    const oldTitle = document.title;
    const now = new Date();
    const dateTimeStr = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(
      now.getDate()
    ).padStart(2, '0')}`;

    document.title = `${activePaperTitle}_${dateTimeStr}`;
    window.print();
    document.title = oldTitle;
  };

  const activeProblem = worksheetData.find((p) => p.id === activeId);

  return (
    <main className="min-h-screen bg-neu-base font-body text-neu-text p-3 sm:p-6 md:p-12 print:bg-white print:p-0 overflow-x-hidden">
      <style jsx global>{`
        @media print {
          @page {
            size: A4 portrait;
            margin: 0;
          }
          html, body {
            background: white !important;
            margin: 0 !important;
            padding: 0 !important;
            width: 210mm !important;
            height: 100% !important;
            overflow: visible !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .pdf-page-wrapper {
            width: 210mm !important;
            height: 296mm !important;
            max-height: 296mm !important;
            box-shadow: none !important;
            border-radius: 0 !important;
            break-inside: avoid !important;
            page-break-inside: avoid !important;
            overflow: hidden !important;
            box-sizing: border-box !important;
            margin: 0 auto !important;
          }
          .pdf-page-wrapper:not(:last-child) {
            break-after: page !important;
            page-break-after: always !important;
          }
          .pdf-page-wrapper:last-child {
            break-after: avoid !important;
            page-break-after: avoid !important;
          }
          .print-grid-v {
            display: grid !important;
            grid-template-columns: repeat(4, minmax(0, 1fr)) !important;
          }
          .print-grid-ans-4col {
            display: grid !important;
            grid-template-columns: repeat(4, minmax(0, 1fr)) !important;
          }
        }
      `}</style>

      {/* 控制面板 */}
      <WorksheetForm
        availableUnits={availableUnits}
        selectedUnit={selectedUnit}
        setSelectedUnit={setSelectedUnit}
        paperTitle={paperTitle}
        setPaperTitle={setPaperTitle}
        questionCount={questionCount}
        setQuestionCount={setQuestionCount}
        layoutPref={layoutPref}
        setLayoutPref={setLayoutPref}
        spacingFactor={spacingFactor}
        setSpacingFactor={setSpacingFactor}
        showAnswers={showAnswers}
        setShowAnswers={setShowAnswers}
        showBopomofo={showBopomofo}
        setShowBopomofo={setShowBopomofo}
        isVerticalSupported={isVerticalSupported}
        hasWorksheetData={worksheetData.length > 0}
        onGenerate={handleGenerate}
        onPrintOrExport={handlePrintOrExport}
      />

      {/* 題目卷面與解答頁 Preview */}
      {worksheetData.length > 0 && (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <div className="w-full overflow-x-auto py-4 print:overflow-visible print:py-0">
            <div className="w-[210mm] min-w-[210mm] mx-auto mt-6 sm:mt-12 print:mt-0 print:w-full print:min-w-0 flex flex-col gap-8 print:gap-0">
              {/* 題目卷頁面 */}
              {pages.map((pageProblems, pageIndex) => (
                <WorksheetPaper
                  key={`problem-page-${pageIndex}`}
                  pageProblems={pageProblems}
                  pageIndex={pageIndex}
                  totalPages={pages.length}
                  itemsPerPage={itemsPerPage}
                  activePaperTitle={activePaperTitle}
                  activeUnitTitle={activeUnitTitle}
                  activeIsWordProblem={activeIsWordProblem}
                  layoutPref={layoutPref}
                  spacingFactor={spacingFactor}
                  showBopomofo={showBopomofo}
                  onRegenerateSingle={handleRegenerateSingle}
                  onUpdateProblem={handleUpdateProblem}
                />
              ))}

              {/* 解答頁 */}
              {showAnswers &&
                answerPages.map((ansPageChunk, ansPageIndex) => (
                  <AnswerPaper
                    key={`answer-page-${ansPageIndex}`}
                    ansPageChunk={ansPageChunk}
                    ansPageIndex={ansPageIndex}
                    totalAnswerPages={answerPages.length}
                    fullWorksheetData={worksheetData}
                    activePaperTitle={activePaperTitle}
                    activeUnitTitle={activeUnitTitle}
                  />
                ))}
            </div>
          </div>

          {/* 拖曳中的浮動預覽層 */}
          <DragOverlay adjustScale={false}>
            {activeId && activeProblem ? (
              <motion.div
                initial={{ scale: 1 }}
                animate={{
                  scale: 1.05,
                  boxShadow:
                    '20px 20px 35px rgba(163,177,198,0.85), -20px -20px 35px rgba(255,255,255,0.8)',
                }}
                className={`bg-white rounded-2xl p-4 cursor-grabbing border border-neu-primary/20 ${
                  activeIsWordProblem ? 'w-full max-w-xl' : 'max-w-[200px]'
                }`}
              >
                <MathProblemRenderer
                  index={worksheetData.findIndex((p) => p.id === activeId) + 1}
                  problem={activeProblem}
                  showAnswer={false}
                  layoutPref={layoutPref}
                  spacingFactor={spacingFactor}
                  showBopomofo={showBopomofo}
                />
              </motion.div>
            ) : null}
          </DragOverlay>
        </DndContext>
      )}
    </main>
  );
}