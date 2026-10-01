import React from 'react';
import { Link } from 'react-router-dom';
import { Tag, Sparkles, Check, ArrowRight, Layers, FileCode } from 'lucide-react';

export const PrivateLabel: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative bg-[#2B2E26] text-[#FAF6EF] py-24 sm:py-32 lg:py-36 border-b border-[#3B3F34]">
        <div className="editorial-container text-center space-y-6 max-w-4xl mx-auto">
          <span className="label-caps text-[#A9BFB1]">
            Custom Branding &amp; OEM Development
          </span>
          <h1 className="editorial-title text-4xl sm:text-6xl lg:text-7xl text-[#FAF6EF]">
            Private Label <em>Manufacturing</em>
          </h1>
          <p className="font-header text-xl sm:text-3xl text-[#D9CBB8] italic font-light max-w-2xl mx-auto">
            "Your Brand Name, Fabricated with Flawless Export Excellence."
          </p>
          <p className="text-xs sm:text-sm text-[#D9CBB8]/80 max-w-xl mx-auto leading-relaxed font-montreal">
            From emerging boutique labels launching their premiere capsule collection to established international retail chains seeking turnkey OEM contract production.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-spacing editorial-container">
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="label-caps text-[#B9694A] block mb-2">Customization Capabilities</span>
          <h2 className="editorial-title text-3xl sm:text-5xl text-[#2B2E26]">
            Every Component Branded to Your Spec
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          <div className="p-8 sm:p-10 border border-[#D9CBB8] bg-[#FAF6EF] space-y-4">
            <span className="font-mono text-xs text-[#B9694A] font-semibold">01 / TRIMS</span>
            <h4 className="font-header text-2xl text-[#2B2E26] font-normal">Woven &amp; Printed Neck Labels</h4>
            <p className="text-xs sm:text-sm text-[#575C4E] leading-relaxed font-montreal">
              High-definition damask woven labels, ultra-soft printed satin, or heat-transfer tagless neck prints for zero skin irritation on swimwear and intimates.
            </p>
          </div>

          <div className="p-8 sm:p-10 border border-[#D9CBB8] bg-[#FAF6EF] space-y-4">
            <span className="font-mono text-xs text-[#B9694A] font-semibold">02 / HARDWARE</span>
            <h4 className="font-header text-2xl text-[#2B2E26] font-normal">Custom Engraved Metal Accents</h4>
            <p className="text-xs sm:text-sm text-[#575C4E] leading-relaxed font-montreal">
              Zinc alloy, brass, and stainless steel hardware with your custom debossed logo. Salt-resistant plating in matte gold, shiny rose, gunmetal, and antique bronze.
            </p>
          </div>

          <div className="p-8 sm:p-10 border border-[#D9CBB8] bg-[#FAF6EF] space-y-4">
            <span className="font-mono text-xs text-[#B9694A] font-semibold">03 / PACKAGING</span>
            <h4 className="font-header text-2xl text-[#2B2E26] font-normal">FSC Hangtags &amp; Eco Bags</h4>
            <p className="text-xs sm:text-sm text-[#575C4E] leading-relaxed font-montreal">
              350 GSM embossed hangtags with safety pins, natural cotton strings, destination barcodes, and frosted 100% biodegradable zipper polybags.
            </p>
          </div>

          <div className="p-8 sm:p-10 border border-[#D9CBB8] bg-[#FAF6EF] space-y-4">
            <span className="font-mono text-xs text-[#B9694A] font-semibold">04 / COLORWAYS</span>
            <h4 className="font-header text-2xl text-[#2B2E26] font-normal">Pantone Matching (TCX/TPG)</h4>
            <p className="text-xs sm:text-sm text-[#575C4E] leading-relaxed font-montreal">
              Fast 3 to 4 day lab-dip submissions for approval against your custom seasonal palette. Guaranteed dye consistency between sample swatches and bulk production yardage.
            </p>
          </div>

          <div className="p-8 sm:p-10 border border-[#D9CBB8] bg-[#FAF6EF] space-y-4">
            <span className="font-mono text-xs text-[#B9694A] font-semibold">05 / PATTERNS</span>
            <h4 className="font-header text-2xl text-[#2B2E26] font-normal">Bespoke Tech Pack CAD</h4>
            <p className="text-xs sm:text-sm text-[#575C4E] leading-relaxed font-montreal">
              Send us your initial hand sketches or technical CAD flats. Our technical pattern room develops grading dimension charts and digital markers for production.
            </p>
          </div>

          <div className="p-8 sm:p-10 border border-[#D9CBB8] bg-[#FAF6EF] space-y-4">
            <span className="font-mono text-xs text-[#B9694A] font-semibold">06 / YARDAGE</span>
            <h4 className="font-header text-2xl text-[#2B2E26] font-normal">Custom Exclusive Prints</h4>
            <p className="text-xs sm:text-sm text-[#575C4E] leading-relaxed font-montreal">
              Digital reactive printing and rotary screen yardage. We sign strict Non-Disclosure Agreements (NDA) protecting your exclusive proprietary artwork.
            </p>
          </div>
        </div>
      </section>

      {/* NDA & IP Protection Banner */}
      <section className="bg-[#EAE0D0]/40 border-y border-[#D9CBB8] py-20 sm:py-24">
        <div className="editorial-container flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3">
            <span className="label-caps text-[#B9694A]">Confidentiality Guarantee</span>
            <h3 className="font-header text-3xl sm:text-4xl text-[#2B2E26]">
              100% Intellectual Property Protection
            </h3>
            <p className="text-xs sm:text-sm text-[#575C4E] max-w-xl leading-relaxed font-montreal">
              Your tech packs, measurements, exclusive print files, and buyer information are governed by formal bilateral NDAs. We never re-sell or display private label client styles.
            </p>
          </div>

          <Link to="/contact" className="btn-terracotta text-xs py-3.5 px-8 shrink-0">
            Submit Tech Pack Under NDA
          </Link>
        </div>
      </section>
    </div>
  );
};
