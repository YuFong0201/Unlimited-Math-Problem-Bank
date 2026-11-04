import React from 'react';

interface NeuToggleProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  color?: 'primary' | 'success';
}

export function NeuToggle({ label, checked, onChange, color = 'success' }: NeuToggleProps) {
  const dotColor = color === 'primary' ? 'bg-neu-primary shadow-[0_0_8px_rgba(108,99,255,0.6)]' : 'bg-neu-success shadow-[0_0_8px_rgba(56,178,172,0.6)]';

  return (
    <label className="flex items-center space-x-3 cursor-pointer group select-none">
      <div className="w-8 h-8 rounded-xl bg-neu-base shadow-neu-inset-deep flex items-center justify-center transition-all duration-300">
        <div className={`w-4 h-4 rounded-md transition-all duration-300 ${checked ? dotColor + ' scale-100' : 'bg-transparent scale-0'}`} />
      </div>
      <span className="font-bold text-neu-text">{label}</span>
      <input type="checkbox" className="sr-only" checked={checked} onChange={(e) => onChange(e.target.checked)} />
    </label>
  );
}