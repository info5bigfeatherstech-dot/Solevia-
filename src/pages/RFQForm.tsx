import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  FileText,
  Upload,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  Building,
  Calendar,
  Layers,
  FileCheck,
} from 'lucide-react';
import { useStore } from '../store/useStore';
import { apiService } from '../services/apiService';
import { CompanyDetails, ProductionRequirements } from '../types';

export const RFQForm: React.FC = () => {
  const { inquiryItems, user, submitRFQ } = useStore();
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [techPackFile, setTechPackFile] = useState<File | null>(null);
  const [uploadingTechPack, setUploadingTechPack] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Step 1: Company details
  const [company, setCompany] = useState<CompanyDetails>({
    companyName: user?.companyName || 'Maison Mer Boutiques',
    contactPerson: user?.name || 'Camilla Laurent',
    businessType: (user?.businessType as CompanyDetails['businessType']) || 'Boutique Chain',
    website: 'https://maisonmer.fr',
    email: user?.businessEmail || 'buyer@maisonmer.fr',
    phone: user?.phone || '+33 6 49 20 18 90',
    country: user?.country || 'France',
    city: 'Nice',
    address: '14 Promenade des Anglais',
    taxId: user?.taxId || 'FR-9482910482',
  });

  // Step 2: Production Requirements
  const [requirements, setRequirements] = useState<ProductionRequirements>({
    targetQuantityTotal: inquiryItems.reduce((acc, i) => acc + i.quantity, 0) || 600,
    incoterm: 'FOB',
    destinationPort: 'Le Havre Port / Marseille Port',
    targetDeliveryDate: '2027-02-15',
    packagingLabeling: 'Recycled woven neck tags + FSC card stock hangtags',
    customizationNotes: 'Custom Pantone dye matching for Terracotta colorway, engraved zinc buttons.',
    sampleRequired: true,
  });

  // Indicative total
  const estimatedTotal = inquiryItems.reduce((acc, item) => {
    let price = item.product.fobStartingPrice;
    if (item.product.fobPriceTiers) {
      for (const t of item.product.fobPriceTiers) {
        if (item.quantity >= t.minQty) price = t.price;
      }
    }
    return acc + price * item.quantity;
  }, 0);

  const totalPieces = inquiryItems.reduce((acc, i) => acc + i.quantity, 0);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setTechPackFile(file);
      setUploadingTechPack(true);
      const res = await apiService.uploadTechPack(file);
      setUploadedFileName(res.fileName);
      setRequirements((prev) => ({ ...prev, techPackFileName: res.fileName }));
      setUploadingTechPack(false);
    }
  };

  const handleFinalSubmit = async () => {
    setSubmitting(true);
    const newRFQ = submitRFQ({
      company,
      requirements,
      items: inquiryItems,
      estimatedTotalUSD: estimatedTotal,
    });
    setSubmitting(false);
    navigate(`/rfq-confirmation/${newRFQ.rfqNumber}`);
  };

  return (
    <div className="editorial-container min-h-screen py-14 sm:py-20 lg:py-24">
      {/* Header */}
      <div className="mb-12 pb-8 border-b border-[#D9CBB8]">
        <span className="label-caps text-[#B9694A] block mb-2">
          Direct Factory Sourcing • Commercial Quotation
        </span>
        <h1 className="editorial-title text-4xl sm:text-5xl lg:text-6xl text-[#2B2E26]">
          Request for <em>Quotation</em> (RFQ)
        </h1>
        <p className="text-xs sm:text-sm text-[#575C4E] mt-3 max-w-xl font-montreal leading-relaxed">
          Provide your company details and production specifications. Our export desk generates formal commercial pro-forma invoices and CIF/FOB quotations within 24 to 48 hours.
        </p>
      </div>

      {/* Progress Steps Indicator */}
      <div className="grid grid-cols-3 gap-3 sm:gap-6 mb-12 pb-8 border-b border-[#D9CBB8]">
        {[
          { step: 1, title: 'Company Profile' },
          { step: 2, title: 'Production Terms' },
          { step: 3, title: 'Review & Submit' },
        ].map((s) => {
          const isActive = currentStep === s.step;
          const isPassed = currentStep > s.step;
          return (
            <div
              key={s.step}
              className={`p-4 sm:p-5 border transition-colors flex items-center gap-3 ${
                isActive
                  ? 'border-[#2B2E26] bg-[#2B2E26] text-[#FAF6EF]'
                  : isPassed
                  ? 'border-[#A9BFB1] bg-[#A9BFB1]/20 text-[#2B2E26]'
                  : 'border-[#D9CBB8] bg-white text-[#575C4E]'
              }`}
            >
              <span className="font-mono text-xs sm:text-sm font-semibold">0{s.step}</span>
              <span className="text-xs uppercase tracking-wider font-medium hidden sm:inline font-montreal">
                {s.title}
              </span>
            </div>
          );
        })}
      </div>

      {/* Main Grid: Form Steps + Sticky Inquiry Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* Left Form Area (Span 7) */}
        <div className="lg:col-span-7 bg-[#FAF6EF] border border-[#D9CBB8] p-8 sm:p-10 lg:p-12 space-y-8">
          {/* ================= STEP 1: COMPANY DETAILS ================= */}
          {currentStep === 1 && (
            <div className="space-y-7">
              <div>
                <h3 className="font-header text-3xl text-[#2B2E26]">Step 1: Registered Company Profile</h3>
                <p className="text-xs sm:text-sm text-[#575C4E] mt-2 font-montreal leading-relaxed">
                  Required for commercial export invoicing, customs declaration, and credit verification.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="label-caps text-[#2B2E26] block mb-2">Company / Entity Name *</label>
                  <input
                    type="text"
                    required
                    value={company.companyName}
                    onChange={(e) => setCompany({ ...company, companyName: e.target.value })}
                    className="input-editorial"
                  />
                </div>

                <div>
                  <label className="label-caps text-[#2B2E26] block mb-2">Contact Person &amp; Title *</label>
                  <input
                    type="text"
                    required
                    value={company.contactPerson}
                    onChange={(e) => setCompany({ ...company, contactPerson: e.target.value })}
                    className="input-editorial"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="label-caps text-[#2B2E26] block mb-2">Business Profile *</label>
                  <select
                    value={company.businessType}
                    onChange={(e) => setCompany({ ...company, businessType: e.target.value as any })}
                    className="input-editorial font-montreal text-xs"
                  >
                    <option value="Boutique Chain">Boutique Chain (Multiple Stores)</option>
                    <option value="Retailer">Independent Retail Boutique</option>
                    <option value="Fashion Brand / Label">Fashion Brand / Label</option>
                    <option value="Wholesale Importer">Wholesale Importer / Distributor</option>
                    <option value="Department Store">Department Store Group</option>
                  </select>
                </div>

                <div>
                  <label className="label-caps text-[#2B2E26] block mb-2">Company Website</label>
                  <input
                    type="url"
                    value={company.website}
                    onChange={(e) => setCompany({ ...company, website: e.target.value })}
                    placeholder="https://yourbrand.com"
                    className="input-editorial"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="label-caps text-[#2B2E26] block mb-2">Official Business Email *</label>
                  <input
                    type="email"
                    required
                    value={company.email}
                    onChange={(e) => setCompany({ ...company, email: e.target.value })}
                    className="input-editorial"
                  />
                </div>

                <div>
                  <label className="label-caps text-[#2B2E26] block mb-2">Phone / WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    value={company.phone}
                    onChange={(e) => setCompany({ ...company, phone: e.target.value })}
                    className="input-editorial"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div>
                  <label className="label-caps text-[#2B2E26] block mb-2">Country *</label>
                  <input
                    type="text"
                    required
                    value={company.country}
                    onChange={(e) => setCompany({ ...company, country: e.target.value })}
                    className="input-editorial"
                  />
                </div>

                <div>
                  <label className="label-caps text-[#2B2E26] block mb-2">City *</label>
                  <input
                    type="text"
                    required
                    value={company.city}
                    onChange={(e) => setCompany({ ...company, city: e.target.value })}
                    className="input-editorial"
                  />
                </div>

                <div>
                  <label className="label-caps text-[#2B2E26] block mb-2">Tax / VAT / EIN Number</label>
                  <input
                    type="text"
                    value={company.taxId || ''}
                    onChange={(e) => setCompany({ ...company, taxId: e.target.value })}
                    placeholder="e.g. FR-9482910482"
                    className="input-editorial"
                  />
                </div>
              </div>

              <div>
                <label className="label-caps text-[#2B2E26] block mb-2">Registered Business Address *</label>
                <input
                  type="text"
                  required
                  value={company.address}
                  onChange={(e) => setCompany({ ...company, address: e.target.value })}
                  className="input-editorial"
                />
              </div>

              <div className="pt-6 flex justify-end">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="btn-terracotta py-3.5 px-8 text-xs flex items-center gap-2"
                >
                  <span>Proceed to Production Requirements</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* ================= STEP 2: PRODUCTION REQUIREMENTS ================= */}
          {currentStep === 2 && (
            <div className="space-y-8">
              <div>
                <h3 className="font-header text-3xl text-[#2B2E26]">Step 2: Commercial &amp; Shipping Requirements</h3>
                <p className="text-xs sm:text-sm text-[#575C4E] mt-2 font-montreal leading-relaxed">
                  Specify your preferred delivery timeline, incoterms, destination port, and custom packaging.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div>
                  <label className="label-caps text-[#2B2E26] block mb-2">Preferred Incoterm *</label>
                  <select
                    value={requirements.incoterm}
                    onChange={(e) => setRequirements({ ...requirements, incoterm: e.target.value as any })}
                    className="input-editorial font-montreal text-xs"
                  >
                    <option value="FOB">FOB (Freight on Board - India Ports)</option>
                    <option value="CIF">CIF (Cost, Insurance &amp; Freight)</option>
                    <option value="EXW">EXW (Ex-Works Factory Floor)</option>
                    <option value="DDP">DDP (Delivered Duty Paid to Door)</option>
                  </select>
                </div>

                <div>
                  <label className="label-caps text-[#2B2E26] block mb-2">Destination Port / Airport *</label>
                  <input
                    type="text"
                    required
                    value={requirements.destinationPort}
                    onChange={(e) => setRequirements({ ...requirements, destinationPort: e.target.value })}
                    placeholder="e.g. Rotterdam Port / Los Angeles Port"
                    className="input-editorial"
                  />
                </div>

                <div>
                  <label className="label-caps text-[#2B2E26] block mb-2">Target Delivery Date *</label>
                  <input
                    type="date"
                    required
                    value={requirements.targetDeliveryDate}
                    onChange={(e) => setRequirements({ ...requirements, targetDeliveryDate: e.target.value })}
                    className="input-editorial"
                  />
                </div>
              </div>

              <div>
                <label className="label-caps text-[#2B2E26] block mb-2">Packaging &amp; Labeling Instructions</label>
                <textarea
                  rows={2}
                  value={requirements.packagingLabeling}
                  onChange={(e) => setRequirements({ ...requirements, packagingLabeling: e.target.value })}
                  placeholder="e.g. Private woven neck labels, recycled card hangtags with barcodes, individual frosted polybags..."
                  className="input-editorial"
                />
              </div>

              <div>
                <label className="label-caps text-[#2B2E26] block mb-2">Customization &amp; Fabric Notes</label>
                <textarea
                  rows={3}
                  value={requirements.customizationNotes}
                  onChange={(e) => setRequirements({ ...requirements, customizationNotes: e.target.value })}
                  placeholder="Mention custom Pantone references, button preferences, lining modifications, or split shipment schedules..."
                  className="input-editorial"
                />
              </div>

              {/* Sample requested checkbox */}
              <div className="p-4 bg-[#EAE0D0]/40 border border-[#D9CBB8] flex items-center gap-3">
                <input
                  type="checkbox"
                  id="sampleRequired"
                  checked={requirements.sampleRequired}
                  onChange={(e) => setRequirements({ ...requirements, sampleRequired: e.target.checked })}
                  className="w-4 h-4 text-[#B9694A] rounded-none focus:ring-0"
                />
                <label htmlFor="sampleRequired" className="text-xs sm:text-sm text-[#2B2E26] cursor-pointer font-montreal">
                  <strong>Request Pre-Production Samples (PPS)</strong> prior to bulk cutting (credited 100% against bulk commercial invoice).
                </label>
              </div>

              {/* Tech Pack / Spec Sheet File Upload */}
              <div className="border border-dashed border-[#D9CBB8] bg-white p-8 text-center space-y-2">
                <Upload className="w-8 h-8 text-[#575C4E] mx-auto mb-2" />
                <span className="label-caps text-[#2B2E26] block">Upload Tech Pack / Measurement Chart</span>
                <p className="text-xs text-[#575C4E] mb-4 font-montreal">
                  PDF, AI, DXF, or ZIP files up to 25MB.
                </p>
                <input
                  type="file"
                  id="techPackInput"
                  onChange={handleFileUpload}
                  className="hidden"
                  accept=".pdf,.ai,.zip,.png,.jpg,.jpeg,.dxf"
                />
                <label
                  htmlFor="techPackInput"
                  className="btn-outline py-2.5 px-6 text-xs cursor-pointer inline-block"
                >
                  {uploadingTechPack ? 'Uploading...' : uploadedFileName ? 'Replace Tech Pack' : 'Select File'}
                </label>
                {uploadedFileName && (
                  <div className="mt-3 text-xs text-[#B9694A] flex items-center justify-center gap-1.5 font-medium font-montreal">
                    <FileCheck className="w-4 h-4" />
                    <span>Attached: {uploadedFileName}</span>
                  </div>
                )}
              </div>

              <div className="pt-6 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="btn-outline py-2.5 px-6 text-xs flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Company Details</span>
                </button>

                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="btn-terracotta py-3.5 px-8 text-xs flex items-center gap-2"
                >
                  <span>Review &amp; Submit RFQ</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* ================= STEP 3: REVIEW & SUBMIT ================= */}
          {currentStep === 3 && (
            <div className="space-y-8">
              <div>
                <h3 className="font-header text-3xl text-[#2B2E26]">Step 3: Review Quote Request</h3>
                <p className="text-xs sm:text-sm text-[#575C4E] mt-2 font-montreal leading-relaxed">
                  Please verify your company and production terms before transmission to our commercial export desk.
                </p>
              </div>

              {/* Company Summary Card */}
              <div className="p-6 border border-[#D9CBB8] bg-white text-xs sm:text-sm space-y-3 font-montreal">
                <div className="flex items-center justify-between border-b border-[#D9CBB8] pb-2 font-medium text-[#2B2E26]">
                  <span className="uppercase tracking-wider font-semibold">Company Profile</span>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="text-[#B9694A] hover:underline"
                  >
                    Edit
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-3 text-[#575C4E]">
                  <div><strong>Company:</strong> {company.companyName}</div>
                  <div><strong>Contact:</strong> {company.contactPerson}</div>
                  <div><strong>Email:</strong> {company.email}</div>
                  <div><strong>Phone:</strong> {company.phone}</div>
                  <div><strong>Location:</strong> {company.city}, {company.country}</div>
                  <div><strong>Business Type:</strong> {company.businessType}</div>
                </div>
              </div>

              {/* Terms Summary Card */}
              <div className="p-6 border border-[#D9CBB8] bg-white text-xs sm:text-sm space-y-3 font-montreal">
                <div className="flex items-center justify-between border-b border-[#D9CBB8] pb-2 font-medium text-[#2B2E26]">
                  <span className="uppercase tracking-wider font-semibold">Logistics &amp; Terms</span>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="text-[#B9694A] hover:underline"
                  >
                    Edit
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-3 text-[#575C4E]">
                  <div><strong>Incoterm:</strong> {requirements.incoterm}</div>
                  <div><strong>Port:</strong> {requirements.destinationPort}</div>
                  <div><strong>Target Delivery:</strong> {requirements.targetDeliveryDate}</div>
                  <div><strong>Sample Required:</strong> {requirements.sampleRequired ? 'Yes (PPS)' : 'No'}</div>
                  {uploadedFileName && (
                    <div className="col-span-2">
                      <strong>Attached Tech Pack:</strong> {uploadedFileName}
                    </div>
                  )}
                </div>
              </div>

              {/* Submission Notice */}
              <div className="p-5 bg-[#A9BFB1]/20 border border-[#A9BFB1]/50 text-xs sm:text-sm text-[#2B2E26] space-y-2 font-montreal">
                <div className="flex items-center gap-2 font-medium">
                  <CheckCircle2 className="w-5 h-5 text-[#2B2E26]" />
                  <span className="font-semibold">Wholesale Manufacturer Guarantee</span>
                </div>
                <p className="text-[#575C4E] leading-relaxed">
                  Upon submission, your assigned export account manager will review yardage availability, compute actual container cubic meters (CBM), and send an official signed Commercial Proforma Invoice within 24-48 hours.
                </p>
              </div>

              <div className="pt-6 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="btn-outline py-2.5 px-6 text-xs flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Terms</span>
                </button>

                <button
                  type="button"
                  disabled={submitting}
                  onClick={handleFinalSubmit}
                  className="btn-terracotta py-3.5 px-8 text-xs tracking-wider flex items-center gap-2"
                >
                  <span>{submitting ? 'Transmitting RFQ...' : 'Submit Formal Quote Request'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Sticky Inquiry Summary (Span 5) */}
        <div className="lg:col-span-5 bg-[#FAF6EF] border border-[#D9CBB8] p-6 sm:p-8 space-y-6 lg:sticky lg:top-28">
          <div className="flex items-center justify-between border-b border-[#D9CBB8] pb-4">
            <span className="font-header text-2xl text-[#2B2E26]">Inquiry Summary</span>
            <span className="text-[0.625rem] bg-[#2B2E26] text-[#FAF6EF] px-2.5 py-1 uppercase tracking-wider font-montreal">
              {inquiryItems.length} Styles
            </span>
          </div>

          {inquiryItems.length === 0 ? (
            <div className="py-12 text-center text-xs sm:text-sm text-[#575C4E] space-y-3 font-montreal">
              <p>No styles currently selected from catalog.</p>
              <Link to="/collections" className="text-[#B9694A] underline font-medium block">
                Add styles from Collections
              </Link>
            </div>
          ) : (
            <div className="space-y-4 max-h-96 overflow-y-auto pr-1 divide-y divide-[#D9CBB8]">
              {inquiryItems.map((item) => (
                <div key={item.id} className="pt-4 first:pt-0 flex gap-4 text-xs font-montreal">
                  <img
                    src={item.product.images[0]}
                    alt=""
                    className="w-14 h-20 object-cover border border-[#D9CBB8] shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <span className="label-caps text-[#B9694A] block mb-1">{item.product.styleCode}</span>
                    <h5 className="font-header text-sm font-medium text-[#2B2E26] truncate">{item.product.name}</h5>
                    <div className="text-[0.6875rem] text-[#575C4E] mt-1">
                      {item.selectedColor} • {item.quantity} {item.product.moqUnit}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {inquiryItems.length > 0 && (
            <div className="pt-6 border-t border-[#D9CBB8] space-y-3 text-xs sm:text-sm font-montreal">
              <div className="flex items-center justify-between text-[#575C4E]">
                <span>Total Volume Units:</span>
                <strong className="text-[#2B2E26]">{totalPieces} units</strong>
              </div>
              <div className="flex items-center justify-between text-[#575C4E]">
                <span>Commercial Terms:</span>
                <strong className="font-montreal font-semibold text-sm text-[#B9694A] uppercase tracking-wider">
                  Direct Factory Quotation
                </strong>
              </div>
              <p className="text-[0.6875rem] text-[#575C4E] italic pt-1 leading-normal">
                * Commercial invoice will include custom volume concessions, packaging specifications, and negotiated freight (Incoterms 2020).
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
