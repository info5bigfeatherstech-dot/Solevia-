import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Mail, Phone, MapPin, Clock, CheckCircle2 } from 'lucide-react';
import { apiService } from '../services/apiService';
import { useStore } from '../store/useStore';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);
  const { showToast } = useStore();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    await apiService.subscribeCatalog(email, company);
    setLoading(false);
    setIsSubscribed(true);
    showToast('Lookbook & Wholesale Line Sheet dispatched to your email.');
  };

  return (
    <footer className="bg-[#2B2E26] text-[#FAF6EF] border-t border-[#3B3F34]">
      {/* Upper Newsletter / Catalog Strip */}
      <div className="border-b border-[#3B3F34] py-16 sm:py-20">
        <div className="editorial-container grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-6 space-y-3">
            <span className="label-caps text-[#A9BFB1]">
              Export Buyer Resources • Line Sheets &amp; Lookbooks
            </span>
            <h3 className="font-header text-3xl sm:text-4xl font-normal text-[#FAF6EF]">
              Receive Our Seasonal <em className="italic font-light">Wholesale</em> Catalog
            </h3>
            <p className="text-xs sm:text-sm text-[#D9CBB8] leading-relaxed max-w-lg font-montreal">
              Updated monthly with fabric swatches, technical spec sheets, and volume FOB pricing tiers. Exclusive to registered boutiques, retailers, and apparel brands.
            </p>
          </div>

          <div className="lg:col-span-6">
            {isSubscribed ? (
              <div className="p-6 bg-[#3B3F34] border border-[#A9BFB1]/40 flex items-center gap-4">
                <CheckCircle2 className="w-6 h-6 text-[#A9BFB1] shrink-0" />
                <p className="text-xs sm:text-sm text-[#FAF6EF] font-montreal">
                  Thank you! Our export desk has emailed the 2026 Wholesale Lookbook & Line Sheets.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    required
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Company / Boutique Name *"
                    className="input-editorial-dark"
                  />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Business Email Address *"
                    className="input-editorial-dark"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-terracotta w-full py-3.5 text-xs flex items-center justify-center gap-2"
                >
                  <span>{loading ? 'Processing...' : 'Request Seasonal Line Sheet & PDF Catalog'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="editorial-container py-20 sm:py-28">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <span className="font-header text-3xl sm:text-4xl tracking-[0.16em] uppercase text-[#FAF6EF] block font-light">
                Solevia
              </span>
              <span className="block text-[0.625rem] tracking-[0.35em] uppercase text-[#A9BFB1] font-medium mt-1 font-montreal">
                Exports • Garment Manufacturer
              </span>
            </div>

            <p className="font-header text-xl italic text-[#D9CBB8] font-light">
              "Women's Apparel, Crafted for Global Buyers."
            </p>

            <p className="text-xs sm:text-sm text-[#D9CBB8]/80 leading-relaxed max-w-sm font-montreal">
              Solevia Exports is an export-oriented apparel manufacturing house catering to international fashion labels, multi-brand department stores, and independent boutiques across North America, Europe, Australia, and the Middle East.
            </p>

            <div className="pt-4 flex flex-col space-y-3 text-xs text-[#D9CBB8] font-montreal">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-[#B9694A] shrink-0" />
                <span>Solevia Industrial Park, Sector 62, Apparel Zone, India</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#B9694A] shrink-0" />
                <span>Direct Desk: +91 98765 43210 / +91 11 4059 8800</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#B9694A] shrink-0" />
                <span>export-desk@soleviaexports.com</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#A9BFB1] shrink-0" />
                <span>Factory Hours: Mon – Sat, 09:00 – 19:00 IST (GMT +5:30)</span>
              </div>
            </div>
          </div>

          {/* Col 2: Product Lines */}
          <div className="space-y-4">
            <h4 className="label-caps text-[#FAF6EF] border-b border-[#3B3F34] pb-3">
              Product Lines
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm text-[#D9CBB8] font-montreal">
              <li>
                <Link to="/category/swimwear" className="hover:text-[#B9694A] transition-colors">
                  Swimwear &amp; Bikinis (10 Styles)
                </Link>
              </li>
              <li>
                <Link to="/category/dresses" className="hover:text-[#B9694A] transition-colors">
                  Ladies Dresses &amp; Midis (10 Styles)
                </Link>
              </li>
              <li>
                <Link to="/category/boutique" className="hover:text-[#B9694A] transition-colors">
                  Boutique Apparel &amp; Co-Ords (10 Styles)
                </Link>
              </li>
              <li>
                <Link to="/collections" className="hover:text-[#B9694A] transition-colors">
                  Complete Wholesale Catalog
                </Link>
              </li>
              <li>
                <Link to="/private-label" className="hover:text-[#B9694A] transition-colors">
                  Bespoke OEM Tech-Pack Sourcing
                </Link>
              </li>
              <li>
                <Link to="/download-catalog" className="hover:text-[#B9694A] transition-colors">
                  Download Digital Line Sheets
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Manufacturing & B2B */}
          <div className="space-y-4">
            <h4 className="label-caps text-[#FAF6EF] border-b border-[#3B3F34] pb-3">
              Export Operations
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm text-[#D9CBB8] font-montreal">
              <li>
                <Link to="/manufacturing" className="hover:text-[#B9694A] transition-colors">
                  Factory Tour &amp; Capacity
                </Link>
              </li>
              <li>
                <Link to="/manufacturing#qc" className="hover:text-[#B9694A] transition-colors">
                  4-Stage AQL 2.5 Quality Control
                </Link>
              </li>
              <li>
                <Link to="/private-label" className="hover:text-[#B9694A] transition-colors">
                  Private Label &amp; Custom Branding
                </Link>
              </li>
              <li>
                <Link to="/sampling-shipping" className="hover:text-[#B9694A] transition-colors">
                  Sampling Policy &amp; Lead Times
                </Link>
              </li>
              <li>
                <Link to="/sampling-shipping#incoterms" className="hover:text-[#B9694A] transition-colors">
                  Incoterms (FOB, CIF, EXW, DDP)
                </Link>
              </li>
              <li>
                <Link to="/sampling-shipping#payment" className="hover:text-[#B9694A] transition-colors">
                  Wholesale Payment Terms (T/T, L/C)
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Buyer Services */}
          <div className="space-y-4">
            <h4 className="label-caps text-[#FAF6EF] border-b border-[#3B3F34] pb-3">
              Buyer Desk
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm text-[#D9CBB8] font-montreal">
              <li>
                <Link to="/contact" className="hover:text-[#B9694A] transition-colors">
                  Request a Formal Quotation
                </Link>
              </li>
              <li>
                <Link to="/account" className="hover:text-[#B9694A] transition-colors">
                  Buyer Account Portal
                </Link>
              </li>

              <li>
                <Link to="/about" className="hover:text-[#B9694A] transition-colors">
                  About Solevia Exports
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#B9694A] transition-colors">
                  Schedule Factory Visit / Video Call
                </Link>
              </li>
              <li>
                <a
                  href="https://wa.me/919876543210"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#A9BFB1] hover:text-[#FAF6EF] transition-colors flex items-center gap-1.5 font-medium"
                >
                  <span>Chat on WhatsApp Export Desk</span>
                  <ArrowRight className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Compliance & Copyright strip */}
        <div className="mt-20 pt-10 border-t border-[#3B3F34] flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-[#D9CBB8]/70 font-montreal">
          <div>
            © {new Date().getFullYear()} SOLEVIA EXPORTS PVT. LTD. All rights reserved. Strictly B2B Wholesale Exporter.
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <span>Certifications: OEKO-TEX® Standard 100 • GOTS Organic • SEDEX SMETA 4-Pillar</span>
            <span>IEC Code: 0519208412</span>
            <span>Ports: Nhava Sheva (INNSA) / Mundra (INMUN)</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
