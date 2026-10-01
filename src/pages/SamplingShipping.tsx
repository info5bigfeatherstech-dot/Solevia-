import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, Clock, CreditCard, ShieldCheck, ArrowRight, Truck } from 'lucide-react';

export const SamplingShipping: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative bg-[#2B2E26] text-[#FAF6EF] py-24 sm:py-32 lg:py-36 border-b border-[#3B3F34]">
        <div className="editorial-container text-center space-y-6 max-w-4xl mx-auto">
          <span className="label-caps text-[#A9BFB1]">
            Commercial Trade &amp; Freight Documentation
          </span>
          <h1 className="editorial-title text-4xl sm:text-6xl lg:text-7xl text-[#FAF6EF]">
            Sampling, Shipping &amp; <em>Incoterms</em>
          </h1>
          <p className="font-header text-xl sm:text-3xl text-[#D9CBB8] italic font-light max-w-2xl mx-auto">
            Transparent commercial parameters for international wholesale buyers.
          </p>
          <p className="text-xs sm:text-sm text-[#D9CBB8]/80 max-w-xl mx-auto leading-relaxed font-montreal">
            Everything you need to know regarding sample turnaround, port procedures, payment structures, and door delivery logistics.
          </p>
        </div>
      </section>

      {/* Sampling Policy Section */}
      <section className="section-spacing editorial-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="label-caps text-[#B9694A]">Sampling Protocol</span>
            <h2 className="editorial-title text-3xl sm:text-5xl text-[#2B2E26]">
              Pre-Production Samples (PPS) in 5 to 7 Days
            </h2>
            <p className="text-sm sm:text-base text-[#575C4E] leading-relaxed font-montreal">
              We understand that retail buying calendars operate on tight collection deadlines. Our master sample atelier operates 6 days a week to cut, assemble, and courier physical prototypes quickly.
            </p>

            <div className="space-y-4 border-y border-[#D9CBB8] py-6 text-xs sm:text-sm font-montreal text-[#2B2E26]">
              <div className="flex justify-between items-center">
                <strong className="text-[#575C4E] uppercase tracking-wider text-xs">Sample Lead Time:</strong>
                <span>5 - 7 business days from tech pack sign-off</span>
              </div>
              <div className="flex justify-between items-center">
                <strong className="text-[#575C4E] uppercase tracking-wider text-xs">Sample Fee:</strong>
                <span>100% credited against final commercial bulk order</span>
              </div>
              <div className="flex justify-between items-center">
                <strong className="text-[#575C4E] uppercase tracking-wider text-xs">Courier Carrier:</strong>
                <span>DHL Express / FedEx Priority (3-4 days worldwide)</span>
              </div>
              <div className="flex justify-between items-center">
                <strong className="text-[#575C4E] uppercase tracking-wider text-xs">Fit Corrections:</strong>
                <span>1 free revision round included with every sampling order</span>
              </div>
            </div>

            <div className="pt-4">
              <Link to="/contact" className="btn-terracotta text-xs py-3.5 px-8">
                Request Samples with Your RFQ
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="aspect-[4/3] bg-[#EAE0D0] overflow-hidden border border-[#D9CBB8]">
              <img
                src="https://images.unsplash.com/photo-1576426863848-c21f53c60b19?auto=format&fit=crop&w=1200&q=80"
                alt="Apparel sampling and fabric swatches"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Incoterms Defined */}
      <section id="incoterms" className="bg-[#EAE0D0]/40 border-y border-[#D9CBB8] py-24 sm:py-32">
        <div className="editorial-container">
          <div className="mb-16 max-w-xl">
            <span className="label-caps text-[#B9694A] block mb-2">International Trade Rules</span>
            <h3 className="editorial-title text-3xl sm:text-5xl text-[#2B2E26]">
              Incoterms 2020 Supported
            </h3>
            <p className="text-xs sm:text-sm text-[#575C4E] mt-3 font-montreal leading-relaxed">
              We contract under ICC Incoterms standards with full clarity on freight and insurance responsibilities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-8 sm:p-10 border border-[#D9CBB8] bg-[#FAF6EF] space-y-4">
              <span className="font-mono text-base text-[#B9694A] font-bold">FOB</span>
              <h4 className="font-header text-xl text-[#2B2E26] font-normal">Freight On Board (Most Common)</h4>
              <p className="text-xs sm:text-sm text-[#575C4E] leading-relaxed font-montreal">
                We handle all factory packing, inland transit, and customs export clearance onto the vessel at Nhava Sheva (Mumbai) or Mundra Port. Buyer manages ocean freight and destination customs.
              </p>
            </div>

            <div className="p-8 sm:p-10 border border-[#D9CBB8] bg-[#FAF6EF] space-y-4">
              <span className="font-mono text-base text-[#B9694A] font-bold">CIF</span>
              <h4 className="font-header text-xl text-[#2B2E26] font-normal">Cost, Insurance &amp; Freight</h4>
              <p className="text-xs sm:text-sm text-[#575C4E] leading-relaxed font-montreal">
                Solevia Exports prepays ocean freight and maritime marine cargo insurance directly to your named destination port (e.g. CIF Le Havre, CIF Rotterdam, CIF Long Beach).
              </p>
            </div>

            <div className="p-8 sm:p-10 border border-[#D9CBB8] bg-[#FAF6EF] space-y-4">
              <span className="font-mono text-base text-[#B9694A] font-bold">DDP</span>
              <h4 className="font-header text-xl text-[#2B2E26] font-normal">Delivered Duty Paid (Boutiques)</h4>
              <p className="text-xs sm:text-sm text-[#575C4E] leading-relaxed font-montreal">
                Complete hassle-free door delivery. We manage customs brokerage, import duties, and local road transport straight to your retail boutique or distribution warehouse.
              </p>
            </div>

            <div className="p-8 sm:p-10 border border-[#D9CBB8] bg-[#FAF6EF] space-y-4">
              <span className="font-mono text-base text-[#B9694A] font-bold">EXW</span>
              <h4 className="font-header text-xl text-[#2B2E26] font-normal">Ex-Works Factory Floor</h4>
              <p className="text-xs sm:text-sm text-[#575C4E] leading-relaxed font-montreal">
                Goods made available at our facility loading docks. Ideal for large apparel groups with consolidated container logistics contracted in India.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Payment Terms Section */}
      <section id="payment" className="py-24 sm:py-32">
        <div className="editorial-container max-w-4xl mx-auto space-y-10">
          <div className="text-center">
            <span className="label-caps text-[#B9694A] block mb-2">Commercial Settlement</span>
            <h3 className="editorial-title text-3xl sm:text-5xl text-[#2B2E26]">
              Wholesale Payment Structures
            </h3>
            <p className="text-xs sm:text-sm text-[#575C4E] mt-3 font-montreal">
              Standardized banking procedures designed for cross-border export protection.
            </p>
          </div>

          <div className="space-y-6 pt-4">
            <div className="p-8 sm:p-10 border border-[#D9CBB8] bg-white space-y-3 font-montreal">
              <div className="flex items-center justify-between">
                <h5 className="font-header text-2xl text-[#2B2E26]">1. Telegraphic Transfer (T/T Bank Wire)</h5>
                <span className="text-xs bg-[#EAE0D0] px-3 py-1 font-medium text-[#2B2E26]">Standard Baseline</span>
              </div>
              <p className="text-xs sm:text-sm text-[#575C4E] leading-relaxed">
                <strong>30% Advance Deposit</strong> upon purchase order confirmation and tech pack sign-off to initiate fabric procurement. <strong>70% Balance</strong> payable upon provision of final quality inspection certificate and copy of Bill of Lading (B/L) prior to original document surrender.
              </p>
            </div>

            <div className="p-8 sm:p-10 border border-[#D9CBB8] bg-white space-y-3 font-montreal">
              <div className="flex items-center justify-between">
                <h5 className="font-header text-2xl text-[#2B2E26]">2. Irrevocable Letter of Credit (L/C at Sight)</h5>
                <span className="text-xs bg-[#EAE0D0] px-3 py-1 font-medium text-[#2B2E26]">Large Volume Consignments</span>
              </div>
              <p className="text-xs sm:text-sm text-[#575C4E] leading-relaxed">
                Issued via prime international commercial bank (e.g. BNP Paribas, HSBC, JPMorgan Chase, Barclays). Payable 100% at sight upon presentation of compliant shipping documents (B/L, Commercial Invoice, Packing List, GSP Certificate of Origin, Inspection Certificate).
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
