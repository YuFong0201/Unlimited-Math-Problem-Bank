import React, { memo } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { motion } from 'framer-motion';

interface SortableItemProps {
  id: string;
  children: React.ReactNode;
}

export const SortableItem = memo(function SortableItem({ id, children }: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 'auto',
  };

  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      className="relative group select-none w-full overflow-visible my-0.5"
    >
      <div
        {...attributes}
        {...listeners}
        className="absolute -left-5 top-1/2 -translate-y-1/2 p-1.5 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing text-gray-400 hover:text-neu-primary bg-white/90 border border-gray-200 rounded-md shadow-sm print:hidden z-30"
        title="按住拖曳調整順序"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <circle cx="9" cy="5" r="1" fill="currentColor" />
          <circle cx="9" cy="12" r="1" fill="currentColor" />
          <circle cx="9" cy="19" r="1" fill="currentColor" />
          <circle cx="15" cy="5" r="1" fill="currentColor" />
          <circle cx="15" cy="12" r="1" fill="currentColor" />
          <circle cx="15" cy="19" r="1" fill="currentColor" />
        </svg>
      </div>

      <motion.div
        layout
        layoutId={id}
        transition={{
          layout: { type: 'spring', stiffness: 350, damping: 25 },
        }}
        animate={{
          scale: isDragging ? 1.03 : 1,
          boxShadow: isDragging
            ? '16px 16px 28px rgba(163,177,198,0.8), -16px -16px 28px rgba(255,255,255,0.7)'
            : '0px 0px 0px rgba(0,0,0,0)',
        }}

        className="rounded-2xl bg-white p-2 w-full overflow-hidden"
      >
        {children}
      </motion.div>
    </div>
  );
});