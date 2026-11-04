import React from 'react';

export function NeuCard({ children, className = '' }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={`bg-neu-base rounded-[32px] shadow-neu-extruded p-8 md:p-12 ${className}`}>
      {children}
    </div>
  );
}