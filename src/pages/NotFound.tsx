import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const NotFound: React.FC = () => {
  return (
    <div className="editorial-container min-h-[75vh] flex items-center justify-center py-28 sm:py-36 text-center">
      <div className="max-w-lg space-y-6">
        <span className="font-mono text-sm text-[#B9694A] font-semibold tracking-widest">404 EXPORT ROUTE</span>
        <h1 className="font-header text-4xl sm:text-6xl text-[#2B2E26] tracking-tight">
          Page Not <span className="font-serif italic font-normal">Found</span>
        </h1>
        <p className="text-sm font-montreal text-[#575C4E] leading-relaxed max-w-md mx-auto">
          The requested export section or wholesale style code is currently unavailable or has been relocated in our catalogue.
        </p>
        <div className="pt-6 flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/" className="btn-outline text-xs font-montreal tracking-wider uppercase py-3.5 px-6">
            Return to Home
          </Link>
          <Link to="/collections" className="btn-terracotta text-xs font-montreal tracking-wider uppercase py-3.5 px-6 flex items-center justify-center gap-2">
            <span>Browse Collections</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};
