import React, { SelectHTMLAttributes } from 'react';

interface NeuSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
}

export function NeuSelect({ label, ...props }: NeuSelectProps) {
  return (
    <div className="space-y-3">
      <label className="text-sm font-bold text-neu-muted pl-4 block">{label}</label>
      <div className="relative">
        <select 
          {...props}
          className="w-full h-14 px-6 bg-neu-base text-neu-text rounded-2xl shadow-neu-inset-deep outline-none focus:ring-2 focus:ring-neu-primary focus:ring-offset-2 focus:ring-offset-neu-base appearance-none transition-all duration-300"
        >
          {props.children}
        </select>
        <div className="absolute right-4 top-4 w-6 h-6 rounded-full shadow-neu-inset flex items-center justify-center pointer-events-none text-neu-muted">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>
      </div>
    </div>
  );
}