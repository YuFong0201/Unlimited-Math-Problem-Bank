import React from 'react';

interface NeuButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export function NeuButton({ children, onClick, type = 'button', disabled = false }: NeuButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick} 
      disabled={disabled}
      className="w-full h-14 sm:h-16 bg-neu-primary text-white font-bold rounded-2xl shadow-neu-extruded hover:-translate-y-[1px] active:translate-y-[0.5px] transition-all duration-300 text-sm sm:text-base flex items-center justify-center cursor-pointer disabled:opacity-50"
    >
      {children}
    </button>
  );
}