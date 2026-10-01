import React from 'react';
import { Globe, ShieldCheck } from 'lucide-react';

export const AnnouncementBar: React.FC = () => {
  return (
    <div className="bg-[#2B2E26] text-[#FAF6EF] text-[0.6875rem] font-montreal uppercase tracking-[0.18em] py-2.5 px-6 border-b border-[#3B3F34]">
      <div className="editorial-container flex items-center justify-between gap-4">
        <div className="hidden sm:flex items-center gap-2 text-[#A9BFB1]">
          <ShieldCheck className="w-3.5 h-3.5 stroke-[1.5]" />
          <span>OEM / ODM Certified Apparel Manufacturer</span>
        </div>
        
        <div className="mx-auto sm:mx-0 font-medium flex items-center gap-2 text-center">
          <span className="w-1.5 h-1.5 rounded-full bg-[#B9694A] inline-block animate-pulse"></span>
          <span>Wholesale only. Minimum order quantity (MOQ) from 300 pcs per style.</span>
        </div>

        <div className="hidden md:flex items-center gap-5 text-[#D9CBB8]">
          <span className="flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 stroke-[1.5] text-[#A9BFB1]" />
            <span>FOB / CIF Global Freight</span>
          </span>
          <span className="text-[#3B3F34]">|</span>
          <a
            href="https://wa.me/919876543210"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#FAF6EF] transition-colors"
          >
            Direct Export Desk: +91 98765 43210
          </a>
        </div>
      </div>
    </div>
  );
};
