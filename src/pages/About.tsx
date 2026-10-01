import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Globe, Users, ArrowRight, Award } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative bg-[#2B2E26] text-[#FAF6EF] py-24 sm:py-32 lg:py-36 border-b border-[#3B3F34]">
        <div className="editorial-container text-center space-y-6 max-w-4xl mx-auto">
          <span className="label-caps text-[#A9BFB1]">
            Heritage &amp; Infrastructure
          </span>
          <h1 className="editorial-title text-4xl sm:text-6xl lg:text-7xl text-[#FAF6EF]">
            About <em>Solevia Exports</em>
          </h1>
          <p className="font-header text-xl sm:text-3xl text-[#D9CBB8] italic font-light max-w-2xl mx-auto">
            "Bridging artisanal fabric traditions with modern, export-grade manufacturing rigor."
          </p>
          <p className="text-xs sm:text-sm text-[#D9CBB8]/80 max-w-xl mx-auto leading-relaxed font-montreal">
            Founded with a singular mission: to provide independent boutiques, luxury resort chains, and international apparel labels with direct factory access, uncompromised quality, and transparent commercial pricing.
          </p>
        </div>
      </section>

      {/* Main Narrative Split */}
      <section className="section-spacing editorial-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="label-caps text-[#B9694A]">The Export House Story</span>
            <h2 className="editorial-title text-3xl sm:text-5xl lg:text-6xl text-[#2B2E26]">
              Eighteen Years of <em>Global Precision</em>
            </h2>
            <p className="text-sm sm:text-base text-[#575C4E] leading-relaxed font-montreal">
              Solevia Exports began operations with twenty specialized lockstitch machines and a focused vision: to master delicate resort fabrics like pre-washed linen, fine cotton batiste, and performance swimwear tricot that standard mass-market factories routinely struggle to handle.
            </p>
            <p className="text-sm sm:text-base text-[#575C4E] leading-relaxed font-montreal">
              Today, our state-of-the-art facility encompasses over 45,000 square feet of compliant production space, housing computerized pattern grading suites, automated tensionless fabric spreaders, and 240+ skilled seamstresses and master pattern tailors.
            </p>

            <div className="pt-6 grid grid-cols-2 gap-8 border-t border-[#D9CBB8] text-xs sm:text-sm font-montreal">
              <div>
                <strong className="block font-header text-3xl text-[#2B2E26] font-normal mb-1">100%</strong>
                <span className="text-[#575C4E]">Compliant with SEDEX SMETA ethical audit standards.</span>
              </div>
              <div>
                <strong className="block font-header text-3xl text-[#2B2E26] font-normal mb-1">300 Pcs</strong>
                <span className="text-[#575C4E]">Low baseline MOQ to support boutique agility.</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="aspect-[4/3] bg-[#EAE0D0] overflow-hidden border border-[#D9CBB8]">
              <img
                src="https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1200&q=80"
                alt="Apparel Factory Quality Inspection"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Ethical Production Commitments */}
      <section className="bg-[#EAE0D0]/40 border-y border-[#D9CBB8] py-24 sm:py-32">
        <div className="editorial-container">
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="label-caps text-[#B9694A] block mb-2">Our Core Pillars</span>
            <h3 className="editorial-title text-3xl sm:text-5xl text-[#2B2E26]">
              Built for Discerning Brands
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
            <div className="p-8 sm:p-10 border border-[#D9CBB8] bg-[#FAF6EF] space-y-4">
              <span className="font-mono text-xs text-[#B9694A] font-semibold">PILLAR 01</span>
              <h4 className="font-header text-2xl text-[#2B2E26] font-normal">Ethical Human Capital</h4>
              <p className="text-xs sm:text-sm text-[#575C4E] leading-relaxed font-montreal">
                Fair living wages, health insurance, air-purified workstations, and ongoing artisanal skill training. We believe world-class apparel begins with respected craftsmen.
              </p>
            </div>

            <div className="p-8 sm:p-10 border border-[#D9CBB8] bg-[#FAF6EF] space-y-4">
              <span className="font-mono text-[#B9694A] text-xs font-semibold">PILLAR 02</span>
              <h4 className="font-header text-2xl text-[#2B2E26] font-normal">Certified Sustainable Fibers</h4>
              <p className="text-xs sm:text-sm text-[#575C4E] leading-relaxed font-montreal">
                European Flax® certified linen, GOTS certified organic cotton, and ECONYL® regenerated ocean nylon with OEKO-TEX Standard 100 dyeing chemistry.
              </p>
            </div>

            <div className="p-8 sm:p-10 border border-[#D9CBB8] bg-[#FAF6EF] space-y-4">
              <span className="font-mono text-[#B9694A] text-xs font-semibold">PILLAR 03</span>
              <h4 className="font-header text-2xl text-[#2B2E26] font-normal">Zero Communication Friction</h4>
              <p className="text-xs sm:text-sm text-[#575C4E] leading-relaxed font-montreal">
                Dedicated fluent English/French export account managers providing daily WhatsApp photo logs, sample tracking numbers, and transparent vessel schedules.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 sm:py-32 px-4 text-center max-w-3xl mx-auto space-y-8">
        <h2 className="editorial-title text-4xl sm:text-5xl lg:text-6xl text-[#2B2E26]">
          Initiate Your <em>Wholesale</em> Partnership
        </h2>
        <p className="text-xs sm:text-sm text-[#575C4E] leading-relaxed font-montreal max-w-xl mx-auto">
          Request a virtual factory tour via video link or schedule an in-person visit to our sampling atelier.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 pt-4">
          <Link to="/contact" className="btn-terracotta text-xs py-3.5 px-8">
            Request Formal Quotation
          </Link>
          <Link to="/contact" className="btn-outline text-xs py-3.5 px-8">
            Contact Export Desk
          </Link>
        </div>
      </section>
    </div>
  );
};
