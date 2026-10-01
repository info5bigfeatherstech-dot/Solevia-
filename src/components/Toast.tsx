import React from 'react';
import { useStore } from '../store/useStore';
import { CheckCircle2, X } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toastMessage, clearToast } = useStore();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 pointer-events-auto">
      <div className="bg-[#2B2E26] text-[#FAF6EF] border border-[#D9CBB8]/40 shadow-2xl px-6 py-3.5 flex items-center gap-3.5 text-xs font-montreal tracking-wide">
        <CheckCircle2 className="w-4 h-4 text-[#A9BFB1] shrink-0" />
        <span className="font-medium">{toastMessage}</span>
        <button
          type="button"
          onClick={clearToast}
          className="text-[#D9CBB8] hover:text-[#FAF6EF] ml-2 p-0.5"
          aria-label="Dismiss toast"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
