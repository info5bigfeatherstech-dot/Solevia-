import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle2, FileText, Clock, ArrowRight, ShieldCheck, Download } from 'lucide-react';
import { useStore } from '../store/useStore';

export const RFQConfirmation: React.FC = () => {
  const { rfqNumber } = useParams<{ rfqNumber: string }>();
  const { rfqHistory } = useStore();

  const rfq = rfqHistory.find((r) => r.rfqNumber === rfqNumber) || rfqHistory[0];

  return (
    <div className="editorial-container min-h-screen py-16 sm:py-24 lg:py-28 max-w-4xl">
      <div className="border border-[#D9CBB8] bg-[#FAF6EF] p-8 sm:p-14 lg:p-16 shadow-sm space-y-10">
        {/* Top Status */}
        <div className="text-center space-y-4 pb-10 border-b border-[#D9CBB8]">
          <div className="w-16 h-16 bg-[#A9BFB1]/30 border border-[#A9BFB1] mx-auto flex items-center justify-center text-[#2B2E26]">
            <CheckCircle2 className="w-9 h-9 stroke-[1.5]" />
          </div>

          <span className="label-caps font-montreal text-[#B9694A] block">
            Official Transmission Received
          </span>

          <h1 className="font-header text-3xl sm:text-5xl text-[#2B2E26] tracking-tight">
            Quote Request <span className="font-serif italic font-normal">Confirmed</span>
          </h1>

          <div className="inline-block bg-[#EAE0D0] border border-[#D9CBB8] px-5 py-2 text-xs font-mono font-medium text-[#2B2E26]">
            Reference No: {rfq?.rfqNumber || rfqNumber || 'RFQ-2026-1042'}
          </div>

          <p className="text-sm font-montreal text-[#575C4E] max-w-xl mx-auto leading-relaxed mt-2">
            Your technical request has been logged in our export production schedule. Our commercial merchandising team will analyze your destination port requirements and reply within <strong>24 to 48 hours</strong> with a binding proforma quotation.
          </p>
        </div>

        {/* Timeline of Next Steps */}
        <div className="space-y-6">
          <span className="label-caps font-montreal text-[#2B2E26] block">
            What Happens Next:
          </span>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs font-montreal">
            <div className="p-6 border border-[#D9CBB8] bg-white space-y-2">
              <span className="font-mono text-[#B9694A] font-semibold block text-[0.6875rem]">01 / HOURS 1 - 24</span>
              <h5 className="font-header text-base text-[#2B2E26]">Technical Audit</h5>
              <p className="text-[#575C4E] leading-relaxed">
                Garment technologist checks pattern viability, fabric shrinkage metrics, and yarn stock availability.
              </p>
            </div>

            <div className="p-6 border border-[#D9CBB8] bg-white space-y-2">
              <span className="font-mono text-[#B9694A] font-semibold block text-[0.6875rem]">02 / HOURS 24 - 48</span>
              <h5 className="font-header text-base text-[#2B2E26]">Formal Proforma</h5>
              <p className="text-[#575C4E] leading-relaxed">
                Our export director sends your formal CIF/FOB quote with container CBM calculations to your email.
              </p>
            </div>

            <div className="p-6 border border-[#D9CBB8] bg-white space-y-2">
              <span className="font-mono text-[#B9694A] font-semibold block text-[0.6875rem]">03 / DAYS 5 - 7</span>
              <h5 className="font-header text-base text-[#2B2E26]">Pre-Production Sample</h5>
              <p className="text-[#575C4E] leading-relaxed">
                Upon agreement, our master sample room cuts and dispatches physical approval samples via DHL Express.
              </p>
            </div>
          </div>
        </div>

        {/* RFQ Meta Snapshot */}
        {rfq && (
          <div className="p-6 bg-[#EAE0D0]/40 border border-[#D9CBB8] text-xs font-montreal space-y-4">
            <div className="flex items-center justify-between border-b border-[#D9CBB8] pb-3 font-medium text-[#2B2E26]">
              <span className="label-caps font-montreal text-[#2B2E26]">Submission Summary</span>
              <span className="text-[#575C4E]">Status: <strong className="text-[#2B2E26]">Submitted / In Review</strong></span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-[#575C4E]">
              <div><strong>Company:</strong> {rfq.company.companyName}</div>
              <div><strong>Contact:</strong> {rfq.company.contactPerson}</div>
              <div><strong>Destination:</strong> {rfq.requirements.destinationPort}</div>
              <div><strong>Incoterm:</strong> {rfq.requirements.incoterm}</div>
              <div><strong>Pricing Terms:</strong> Commercial Quotation (FOB)</div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-[#D9CBB8]">
          <Link to="/account" className="btn-outline w-full sm:w-auto text-xs font-montreal tracking-wider uppercase py-3.5 px-8 text-center">
            View in Buyer Account Portal
          </Link>

          <Link to="/collections" className="btn-terracotta w-full sm:w-auto text-xs font-montreal tracking-wider uppercase py-3.5 px-8 flex items-center justify-center gap-2">
            <span>Continue Browsing Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};
