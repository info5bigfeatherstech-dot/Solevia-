import React, { useState } from 'react';
import { Download, FileText, CheckCircle2, ArrowRight } from 'lucide-react';
import { useStore } from '../store/useStore';

export const DownloadCatalog: React.FC = () => {
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [downloadInitiated, setDownloadInitiated] = useState(false);
  const { showToast } = useStore();

  const catalogs = [
    {
      title: '2026 Master Wholesale Line Sheet',
      subtitle: 'Complete 30-Style Collection with FOB Price Matrix',
      size: '14.8 MB PDF',
      styles: 'All 30 Production Styles',
      id: 'master-linesheet',
    },
    {
      title: 'Resort 2026 Editorial Lookbook',
      subtitle: 'Campaign Photography, Color Swatches & Material Stories',
      size: '22.4 MB PDF',
      styles: 'Linen, Swimwear & Kaftans',
      id: 'editorial-lookbook',
    },
    {
      title: 'Swimwear & Bikinis Spec Binder',
      subtitle: 'ECONYL® Recycled Lycra Specs, Cup Molds & Hardware',
      size: '8.2 MB PDF',
      styles: '10 Bikini & One-Piece Styles',
      id: 'swimwear-binder',
    },
    {
      title: 'European Flax® Linen Technical Booklet',
      subtitle: 'Normandy Flax Certification, Shrinkage Data & Wash Finishes',
      size: '11.5 MB PDF',
      styles: 'Maxi, Midi & Shirt Dresses',
      id: 'linen-booklet',
    },
  ];

  const handleDownload = (catalogTitle: string) => {
    // Generate text/pdf simulation download
    const content = `SOLEVIA EXPORTS - ${catalogTitle.toUpperCase()}
=====================================================
Brand: SOLEVIA EXPORTS PVT. LTD.
Tagline: Women's Apparel, Crafted for Global Buyers.
Factory: Sector 62, Apparel Zone, India
Direct Export Desk: export-desk@soleviaexports.com
WhatsApp: +91 98765 43210

WHOLESALE SUMMARY:
- Minimum Order Quantity: 300 pcs/style
- Incoterms: FOB, CIF, EXW, DDP
- Sample Turnaround: 5-7 working days
- Bulk Production: 30-45 days
- Certifications: OEKO-TEX Standard 100, GOTS Organic, SEDEX SMETA 4-Pillar

To place wholesale orders or request pre-production samples, visit:
https://soleviaexports.com/rfq
=====================================================`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${catalogTitle.replace(/\s+/g, '_')}_SoleviaExports.txt`;
    a.click();
    showToast(`Downloading: ${catalogTitle}`);
  };

  const handleLeadCapture = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setDownloadInitiated(true);
    handleDownload('Complete_2026_Wholesale_Catalog_Pack');
    showToast('Download started & catalog emailed to your business inbox.');
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative bg-[#2B2E26] text-[#FAF6EF] py-24 sm:py-32 lg:py-36 px-6 sm:px-8 lg:px-12 border-b border-[#3B3F34]">
        <div className="editorial-container max-w-4xl mx-auto text-center space-y-5">
          <span className="label-caps font-montreal text-[#A9BFB1]">
            Buyer Line Sheets &amp; Digital Materials
          </span>
          <h1 className="font-header text-4xl sm:text-6xl text-[#FAF6EF] tracking-tight">
            Download Wholesale <span className="font-serif italic font-normal">Catalogs</span>
          </h1>
          <p className="font-montreal text-lg sm:text-xl text-[#D9CBB8] max-w-xl mx-auto font-light leading-relaxed">
            High-resolution line sheets, FOB pricing tiers, and fabric specification dossiers.
          </p>
        </div>
      </section>

      {/* Main Download Grid */}
      <section className="editorial-container py-20 sm:py-28 lg:py-32">
        {/* Instant Pack Lead Form */}
        <div className="mb-20 border border-[#D9CBB8] bg-[#EAE0D0]/40 p-8 sm:p-12 lg:p-14 max-w-4xl mx-auto shadow-sm">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="label-caps font-montreal text-[#B9694A] block mb-2">
              One-Click Digital Pack
            </span>
            <h3 className="font-header text-2xl sm:text-3xl text-[#2B2E26]">
              Download the Complete 2026 Wholesale Dossier
            </h3>
            <p className="text-sm font-montreal text-[#575C4E] mt-2">
              Includes all 4 line sheets, FOB quantity discount tiers, and fabric color cards.
            </p>
          </div>

          {downloadInitiated ? (
            <div className="p-6 bg-[#A9BFB1]/20 border border-[#A9BFB1] text-xs font-montreal text-center space-y-2">
              <CheckCircle2 className="w-6 h-6 text-[#2B2E26] mx-auto" />
              <p className="font-medium text-[#2B2E26] text-sm">
                Your download has initiated. We also dispatched a backup PDF copy to {email}.
              </p>
            </div>
          ) : (
            <form onSubmit={handleLeadCapture} className="max-w-xl mx-auto space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  required
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Company / Boutique Name *"
                  className="input-editorial"
                />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Business Email Address *"
                  className="input-editorial"
                />
              </div>

              <button
                type="submit"
                className="btn-terracotta w-full py-4 text-xs font-montreal tracking-widest uppercase font-medium flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Download Complete 2026 Wholesale Dossier</span>
              </button>
            </form>
          )}
        </div>

        {/* Individual Catalog Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {catalogs.map((cat) => (
            <div
              key={cat.id}
              className="p-8 sm:p-10 border border-[#D9CBB8] bg-[#FAF6EF] flex flex-col justify-between space-y-6 hover:border-[#2B2E26] transition-all shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between text-[0.6875rem] font-montreal text-[#575C4E] mb-3">
                  <span className="label-caps font-montreal text-[#B9694A]">{cat.styles}</span>
                  <span className="font-mono">{cat.size}</span>
                </div>
                <h4 className="font-header text-xl sm:text-2xl text-[#2B2E26]">{cat.title}</h4>
                <p className="text-sm font-montreal text-[#575C4E] mt-2 leading-relaxed">{cat.subtitle}</p>
              </div>

              <div className="pt-6 border-t border-[#D9CBB8] flex items-center justify-between">
                <span className="text-[0.625rem] font-montreal text-[#575C4E] uppercase tracking-wider">
                  Direct Factory Export Spec
                </span>
                <button
                  type="button"
                  onClick={() => handleDownload(cat.title)}
                  className="btn-outline py-2.5 px-5 text-xs font-montreal tracking-wider uppercase flex items-center gap-2"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
