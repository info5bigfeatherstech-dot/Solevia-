import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Mail, Phone, MapPin, Clock, ArrowRight, CheckCircle2, MessageSquare } from 'lucide-react';
import { useStore } from '../store/useStore';

export const Contact: React.FC = () => {
  const [searchParams] = useSearchParams();
  const styleParam = searchParams.get('style');
  const qtyParam = searchParams.get('qty');
  const typeParam = searchParams.get('type');

  const [formData, setFormData] = useState({
    name: '',
    companyName: '',
    email: '',
    phone: '',
    country: '',
    categoryInterest: 'All Categories',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { showToast } = useStore();

  useEffect(() => {
    if (styleParam) {
      if (typeParam === 'sample') {
        setFormData((prev) => ({
          ...prev,
          message: `Request for Pre-Production Sample (PPS) for Style ${styleParam}. Please advise sample lead time and dispatch details.`,
        }));
      } else {
        const qtyText = qtyParam ? ` (Estimated Quantity: ${qtyParam} units)` : '';
        setFormData((prev) => ({
          ...prev,
          message: `Bulk Quotation Request for Style ${styleParam}${qtyText}. Please provide FOB pricing tiers, production lead times, and packaging details.`,
        }));
      }
    }
  }, [styleParam, qtyParam, typeParam]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      showToast('Your message has reached our Senior Export Director.');
    }, 500);
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative bg-[#2B2E26] text-[#FAF6EF] py-24 sm:py-32 lg:py-36 border-b border-[#3B3F34]">
        <div className="editorial-container text-center space-y-6 max-w-4xl mx-auto">
          <span className="label-caps text-[#A9BFB1]">
            Global Commercial Desk
          </span>
          <h1 className="editorial-title text-4xl sm:text-6xl lg:text-7xl text-[#FAF6EF]">
            Contact <em>Export Desk</em>
          </h1>
          <p className="font-header text-xl sm:text-3xl text-[#D9CBB8] italic font-light max-w-xl mx-auto">
            Direct communication with factory directors, pattern makers, and shipping coordinators.
          </p>
        </div>
      </section>

      {/* Main Contact Grid */}
      <section className="section-spacing editorial-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left: Contact Info & Export Coordinates */}
          <div className="lg:col-span-5 space-y-10">
            <div>
              <span className="label-caps text-[#B9694A] block mb-2">
                Commercial Headquarters
              </span>
              <h2 className="editorial-title text-3xl sm:text-5xl text-[#2B2E26]">
                Solevia Exports Pvt. Ltd.
              </h2>
              <p className="text-xs sm:text-sm text-[#575C4E] mt-3 leading-relaxed font-montreal">
                Apparel Export Promotion Council (AEPC) registered manufacturer and recognized star export house.
              </p>
            </div>

            {/* Direct WhatsApp Callout */}
            <div className="p-6 sm:p-8 border border-[#A9BFB1] bg-[#A9BFB1]/20 space-y-4 font-montreal">
              <div className="flex items-center gap-2.5 text-xs uppercase tracking-wider font-semibold text-[#2B2E26]">
                <MessageSquare className="w-5 h-5 text-[#B9694A]" />
                <span>Instant Buyer WhatsApp Support</span>
              </div>
              <p className="text-xs sm:text-sm text-[#575C4E] leading-relaxed">
                Need quick yardage availability or immediate sample status? Connect directly with our on-duty senior merchandiser.
              </p>
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-terracotta text-xs py-3 px-6 inline-flex items-center gap-2"
              >
                <span>Chat: +91 98765 43210</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="space-y-6 text-xs sm:text-sm text-[#2B2E26] font-montreal">
              <div className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-[#B9694A] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-xs uppercase tracking-wider text-[#575C4E] mb-0.5">Manufacturing Facility:</strong>
                  <span>Plot 48-52, Sector 62, Apparel Park Export Zone, Noida / NCR, India - 201301</span>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Phone className="w-5 h-5 text-[#B9694A] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-xs uppercase tracking-wider text-[#575C4E] mb-0.5">Direct Export Line:</strong>
                  <span>+91 98765 43210 / +91 11 4059 8800 (Mon - Sat, 09:00 - 19:00 IST)</span>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Mail className="w-5 h-5 text-[#B9694A] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-xs uppercase tracking-wider text-[#575C4E] mb-0.5">Official Inquiries:</strong>
                  <span>export-desk@soleviaexports.com / merchandising@soleviaexports.com</span>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Clock className="w-5 h-5 text-[#A9BFB1] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-xs uppercase tracking-wider text-[#575C4E] mb-0.5">Time Zone:</strong>
                  <span>India Standard Time (IST) • GMT +5:30 (4.5 hrs ahead of Paris, 9.5 hrs ahead of NYC)</span>
                </div>
              </div>
            </div>

            {/* Factory Map Graphic Placeholder */}
            {/* <div className="aspect-[16/9] bg-[#EAE0D0] border border-[#D9CBB8] relative overflow-hidden flex items-center justify-center p-8 text-center">
              <div>
                <MapPin className="w-10 h-10 text-[#B9694A] mx-auto mb-3 animate-bounce" />
                <span className="font-header text-xl text-[#2B2E26] block">Apparel Park Facility Map</span>
                <span className="text-xs text-[#575C4E] block mt-1.5 font-montreal">
                  Latitude: 28.5355° N, Longitude: 77.3910° E • 45 mins from Indira Gandhi International Airport (DEL)
                </span>
              </div>
            </div> */}
          </div>

          {/* Right: Contact Form */}
          <div className="lg:col-span-7 bg-[#FAF6EF] border border-[#D9CBB8] p-8 sm:p-10 lg:p-12 space-y-8">
            <div>
              <span className="label-caps text-[#B9694A] block mb-2">
                Direct Inquiries
              </span>
              <h3 className="font-header text-3xl sm:text-4xl text-[#2B2E26]">
                Message the Export Desk
              </h3>
              <p className="text-xs sm:text-sm text-[#575C4E] mt-2 font-montreal leading-relaxed">
                Please provide your company details to receive priority commercial assistance.
              </p>
            </div>

            {submitted ? (
              <div className="p-8 bg-[#A9BFB1]/20 border border-[#A9BFB1] space-y-4 text-xs sm:text-sm font-montreal">
                <div className="flex items-center gap-3 text-base font-semibold text-[#2B2E26]">
                  <CheckCircle2 className="w-6 h-6 text-[#2B2E26]" />
                  <span>Message Successfully Dispatched</span>
                </div>
                <p className="text-[#575C4E] leading-relaxed">
                  Thank you for reaching out to Solevia Exports. Your inquiry has been routed to our Senior Export Director. We will reply within 24 business hours.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="btn-outline text-xs py-2.5 px-6 mt-3"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="label-caps text-[#2B2E26] block mb-2">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Marie Dubois"
                      className="input-editorial"
                    />
                  </div>

                  <div>
                    <label className="label-caps text-[#2B2E26] block mb-2">Company / Brand Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      placeholder="e.g. Maison Chic Boutiques"
                      className="input-editorial"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="label-caps text-[#2B2E26] block mb-2">Business Email *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="buyer@yourcompany.com"
                      className="input-editorial"
                    />
                  </div>

                  <div>
                    <label className="label-caps text-[#2B2E26] block mb-2">Phone / WhatsApp *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+33 6 12 34 56 78"
                      className="input-editorial"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="label-caps text-[#2B2E26] block mb-2">Country of Delivery *</label>
                    <input
                      type="text"
                      required
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      placeholder="e.g. Australia / United States"
                      className="input-editorial"
                    />
                  </div>

                  <div>
                    <label className="label-caps text-[#2B2E26] block mb-2">Category of Primary Interest</label>
                    <select
                      value={formData.categoryInterest}
                      onChange={(e) => setFormData({ ...formData, categoryInterest: e.target.value })}
                      className="input-editorial font-montreal text-xs"
                    >
                      <option value="All Categories">All Wholesale Categories</option>
                      <option value="Swimwear">Swimwear &amp; Bikinis (MOQ 300 sets)</option>
                      <option value="Ladies Dresses">Ladies Dresses &amp; Linen Midis (MOQ 300 pcs)</option>
                      <option value="Boutique Apparel">Boutique Apparel &amp; Co-Ords (MOQ 300 pcs)</option>
                      <option value="Bespoke OEM">Bespoke Tech Pack OEM Development</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="label-caps text-[#2B2E26] block mb-2">Production Message / Style Requirements *</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Include style codes of interest, projected order volume, target delivery month, or specific fabric questions..."
                    className="input-editorial"
                  />
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-terracotta w-full py-3.5 text-xs tracking-wider flex items-center justify-center gap-2"
                  >
                    <span>{loading ? 'Transmitting...' : 'Dispatch Message to Export Desk'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
