import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Cpu, CheckCircle2, ArrowRight, Layers, Award } from 'lucide-react';

export const Manufacturing: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative bg-[#2B2E26] text-[#FAF6EF] py-24 sm:py-32 lg:py-36 border-b border-[#3B3F34]">
        <div className="editorial-container text-center space-y-6 max-w-4xl mx-auto">
          <span className="label-caps text-[#A9BFB1]">
            Engineering &amp; Production Floor
          </span>
          <h1 className="editorial-title text-4xl sm:text-6xl lg:text-7xl text-[#FAF6EF]">
            Manufacturing &amp; <em>Quality Control</em>
          </h1>
          <p className="font-header text-xl sm:text-3xl text-[#D9CBB8] italic font-light max-w-2xl mx-auto">
            120,000 units monthly capacity across three dedicated production units.
          </p>
          <p className="text-xs sm:text-sm text-[#D9CBB8]/80 max-w-xl mx-auto leading-relaxed font-montreal">
            Every garment manufactured at Solevia Exports adheres strictly to ISO 2859-1 (AQL 2.5 Major / 4.0 Minor) statistical sampling guidelines, verified by independent in-house audit officers.
          </p>
        </div>
      </section>

      {/* Factory Floor Machinery Overview */}
      <section className="section-spacing editorial-container">
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 mb-14 border-b border-[#D9CBB8]">
          <div>
            <span className="label-caps text-[#B9694A] block mb-2">
              Equipment Infrastructure
            </span>
            <h2 className="editorial-title text-3xl sm:text-5xl text-[#2B2E26]">
              Modern Sewing &amp; Finishing Technology
            </h2>
          </div>
          <span className="text-xs sm:text-sm text-[#575C4E] max-w-xs mt-3 md:mt-0 font-montreal">
            Juki, Brother, and Eastman Japanese machinery calibrated specifically for lightweight luxury resort fabrics.
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          <div className="p-8 sm:p-10 border border-[#D9CBB8] bg-[#FAF6EF] space-y-4">
            <span className="font-mono text-xs text-[#B9694A] font-semibold">UNIT 01</span>
            <h4 className="font-header text-2xl text-[#2B2E26] font-normal">Automated Pattern CAD &amp; Cutting</h4>
            <p className="text-xs sm:text-sm text-[#575C4E] leading-relaxed font-montreal">
              Lectra &amp; Gerber computerized marker planning software coupled with Eastman CNC straight-knife cutting tables ensures micro-millimeter precision tolerances across complex multi-layered swimwear and linen patterns.
            </p>
          </div>

          <div className="p-8 sm:p-10 border border-[#D9CBB8] bg-[#FAF6EF] space-y-4">
            <span className="font-mono text-xs text-[#B9694A] font-semibold">UNIT 02</span>
            <h4 className="font-header text-2xl text-[#2B2E26] font-normal">Specialized Swimwear Lines</h4>
            <p className="text-xs sm:text-sm text-[#575C4E] leading-relaxed font-montreal">
              Dedicated elastic-attaching differential overlock machines (Yamato / Pegasus) with programmable tension meters prevent waviness or tension pinch on 4-way stretch lycra and recycled tricot fabrics.
            </p>
          </div>

          <div className="p-8 sm:p-10 border border-[#D9CBB8] bg-[#FAF6EF] space-y-4">
            <span className="font-mono text-xs text-[#B9694A] font-semibold">UNIT 03</span>
            <h4 className="font-header text-2xl text-[#2B2E26] font-normal">Fine Finishing &amp; Needle Detection</h4>
            <p className="text-xs sm:text-sm text-[#575C4E] leading-relaxed font-montreal">
              Veit vacuum ironing tables, garment steamers, and Hashima continuous conveyor needle detection machines ensure 100% export compliance before cartons are tape-sealed for sea or air dispatch.
            </p>
          </div>
        </div>
      </section>

      {/* 4-Stage Quality Control Protocol */}
      <section id="qc" className="bg-[#EAE0D0]/40 border-y border-[#D9CBB8] py-24 sm:py-32">
        <div className="editorial-container">
          <div className="mb-16 max-w-xl">
            <span className="label-caps text-[#B9694A] block mb-2">
              Zero-Defect Philosophy
            </span>
            <h3 className="editorial-title text-3xl sm:text-5xl text-[#2B2E26]">
              4-Stage AQL 2.5 Inspection
            </h3>
            <p className="text-xs sm:text-sm text-[#575C4E] mt-3 leading-relaxed font-montreal">
              Our quality assurance protocols operate independently from production quotas to guarantee uncompromised export integrity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="p-6 sm:p-8 border border-[#D9CBB8] bg-[#FAF6EF] space-y-3">
              <span className="font-mono text-xs text-[#B9694A] font-semibold">STAGE 01</span>
              <h5 className="font-header text-xl text-[#2B2E26] font-normal">Raw Fabric &amp; Trims (IQC)</h5>
              <p className="text-xs text-[#575C4E] leading-relaxed font-montreal">
                4-Point System fabric inspection on light-boxes. Color fastness, dimensional stability, GSM weight verification, and rub test approvals.
              </p>
            </div>

            <div className="p-6 sm:p-8 border border-[#D9CBB8] bg-[#FAF6EF] space-y-3">
              <span className="font-mono text-xs text-[#B9694A] font-semibold">STAGE 02</span>
              <h5 className="font-header text-xl text-[#2B2E26] font-normal">Pre-Production Cutting Check</h5>
              <p className="text-xs text-[#575C4E] leading-relaxed font-montreal">
                Marker alignment verification, notch accuracy, grainline checks, and pilot run bundle audits before feeding sewing modules.
              </p>
            </div>

            <div className="p-6 sm:p-8 border border-[#D9CBB8] bg-[#FAF6EF] space-y-3">
              <span className="font-mono text-xs text-[#B9694A] font-semibold">STAGE 03</span>
              <h5 className="font-header text-xl text-[#2B2E26] font-normal">100% In-Line Sewing Check</h5>
              <p className="text-xs text-[#575C4E] leading-relaxed font-montreal">
                Every workstation undergoes roving QA checks: stitch density (SPI), seam strength, tension balance, and measurement tolerance (+/- 0.5 cm).
              </p>
            </div>

            <div className="p-6 sm:p-8 border border-[#D9CBB8] bg-[#FAF6EF] space-y-3">
              <span className="font-mono text-xs text-[#B9694A] font-semibold">STAGE 04</span>
              <h5 className="font-header text-xl text-[#2B2E26] font-normal">Final Carton Audit (FQA)</h5>
              <p className="text-xs text-[#575C4E] leading-relaxed font-montreal">
                Random box pull based on ANSI/ASQ Z1.4 (AQL 2.5). Verification of barcodes, packaging, polybags, carton drop test, and clean dispatch release.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Strip */}
      <section className="py-24 sm:py-32 px-4 text-center max-w-2xl mx-auto space-y-6">
        <h3 className="editorial-title text-3xl sm:text-4xl text-[#2B2E26]">
          Request Third-Party QC Inspection Access
        </h3>
        <p className="text-xs sm:text-sm text-[#575C4E] leading-relaxed font-montreal max-w-lg mx-auto">
          We welcome third-party inspection firms appointed by buyers (SGS, Bureau Veritas, Intertek, QIMA) at our facility for pre-shipment audits.
        </p>
        <div className="pt-4">
          <Link to="/contact" className="btn-terracotta text-xs py-3.5 px-8">
            Inquire Factory Audit Protocols
          </Link>
        </div>
      </section>
    </div>
  );
};
