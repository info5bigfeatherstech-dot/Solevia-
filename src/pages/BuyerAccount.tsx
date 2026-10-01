import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  User,
  FileText,
  Building,
  Clock,
  ArrowRight,
  LogOut,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { useStore } from '../store/useStore';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';

export const BuyerAccount: React.FC = () => {
  const { user, rfqHistory, logout, setUser, showToast } = useStore();
  const [activeTab, setActiveTab] = useState<'rfqs' | 'profile'>('rfqs');
  const navigate = useNavigate();

  // If user is not logged in, redirect to login
  if (!user) {
    return (
      <div className="min-h-screen py-24 px-4 text-center max-w-md mx-auto space-y-4">
        <h2 className="font-serif text-3xl text-[#2B2E26]">Buyer Login Required</h2>
        <p className="text-xs text-[#575C4E]">
          Please sign in to your commercial buyer portal to review past quote submissions and account records.
        </p>
        <Link to="/login" className="btn-terracotta text-xs">
          Sign In to Buyer Account
        </Link>
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Sample Sent':
        return 'bg-[#A9BFB1] text-[#2B2E26] border-[#2B2E26]/20';
      case 'Quoted':
        return 'bg-[#B9694A] text-[#FAF6EF] border-[#B9694A]';
      case 'Under Review':
        return 'bg-[#EAE0D0] text-[#2B2E26] border-[#D9CBB8]';
      case 'Submitted':
      default:
        return 'bg-white text-[#575C4E] border-[#D9CBB8]';
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="editorial-container min-h-screen py-14 sm:py-20 lg:py-24">
      {/* Account Header */}
      <div className="mb-12 pb-8 border-b border-[#D9CBB8] flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="label-caps font-montreal text-[#B9694A]">Verified Wholesale Account</span>
            <span className="text-[#D9CBB8]">•</span>
            <span className="label-caps font-montreal text-[#575C4E]">{user.country}</span>
          </div>
          <h1 className="font-header text-3xl sm:text-5xl text-[#2B2E26] tracking-tight">
            {user.companyName}
          </h1>
          <p className="text-sm font-montreal text-[#575C4E] mt-2">
            Authorized Buyer: <strong className="text-[#2B2E26] font-medium">{user.name}</strong> ({user.businessEmail})
          </p>
        </div>

        <div className="flex items-center gap-4">
          <Link to="/contact" className="btn-terracotta text-xs font-montreal py-3 px-6 tracking-wider uppercase">
            New Quote Request
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="btn-outline text-xs font-montreal py-3 px-4 flex items-center gap-2 tracking-wider uppercase"
            title="Log out of buyer account"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>

      {/* Tabs Row */}
      <div className="flex border-b border-[#D9CBB8] gap-10 mb-10 text-xs font-montreal uppercase tracking-widest font-medium">
        <button
          type="button"
          onClick={() => setActiveTab('rfqs')}
          className={`pb-4 transition-colors border-b-2 -mb-px flex items-center gap-2 ${
            activeTab === 'rfqs'
              ? 'border-[#B9694A] text-[#B9694A]'
              : 'border-transparent text-[#575C4E] hover:text-[#2B2E26]'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>RFQ History ({rfqHistory.length})</span>
        </button>


        <button
          type="button"
          onClick={() => setActiveTab('profile')}
          className={`pb-4 transition-colors border-b-2 -mb-px flex items-center gap-2 ${
            activeTab === 'profile'
              ? 'border-[#B9694A] text-[#B9694A]'
              : 'border-transparent text-[#575C4E] hover:text-[#2B2E26]'
          }`}
        >
          <Building className="w-4 h-4" />
          <span>Company Profile</span>
        </button>
      </div>

      {/* TAB 1: RFQ HISTORY */}
      {activeTab === 'rfqs' && (
        <div className="space-y-6">
          {rfqHistory.length === 0 ? (
            <div className="py-20 sm:py-24 text-center border border-[#D9CBB8] bg-[#FAF6EF] p-8 sm:p-12 space-y-4">
              <h4 className="font-header text-2xl text-[#2B2E26]">No RFQ Submissions Found</h4>
              <p className="text-sm font-montreal text-[#575C4E] max-w-md mx-auto">
                Explore our collections and add styles to your inquiry list to request a custom FOB quote.
              </p>
              <div className="pt-2">
                <Link to="/collections" className="btn-terracotta text-xs font-montreal py-3 px-6 tracking-wider uppercase inline-block">
                  Browse Collections
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {rfqHistory.map((rfq) => (
                <div
                  key={rfq.id}
                  className="p-6 sm:p-8 border border-[#D9CBB8] bg-white space-y-5 transition-all hover:border-[#2B2E26] shadow-sm"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#D9CBB8] pb-4">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-base font-semibold text-[#2B2E26]">
                        {rfq.rfqNumber}
                      </span>
                      <span
                        className={`text-[0.6875rem] px-3 py-1 border uppercase tracking-wider font-montreal font-medium ${getStatusBadge(
                          rfq.status
                        )}`}
                      >
                        {rfq.status}
                      </span>
                    </div>

                    <div className="text-xs font-montreal text-[#575C4E] flex items-center gap-5">
                      <span>Submitted: {new Date(rfq.createdAt).toLocaleDateString()}</span>
                      <span className="font-header text-lg font-bold text-[#2B2E26]">
                        Est. ${rfq.estimatedTotalUSD.toLocaleString()} FOB
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-montreal text-[#575C4E]">
                    <div>
                      <span className="block text-[0.625rem] uppercase tracking-wider text-[#575C4E] mb-1">Destination Port</span>
                      <span className="font-medium text-[#2B2E26] text-sm">{rfq.requirements.destinationPort}</span>
                    </div>
                    <div>
                      <span className="block text-[0.625rem] uppercase tracking-wider text-[#575C4E] mb-1">Incoterm</span>
                      <span className="font-medium text-[#2B2E26] text-sm">{rfq.requirements.incoterm}</span>
                    </div>
                    <div>
                      <span className="block text-[0.625rem] uppercase tracking-wider text-[#575C4E] mb-1">Target Delivery</span>
                      <span className="font-medium text-[#2B2E26] text-sm">{rfq.requirements.targetDeliveryDate}</span>
                    </div>
                    <div>
                      <span className="block text-[0.625rem] uppercase tracking-wider text-[#575C4E] mb-1">Sample Status</span>
                      <span className="font-medium text-[#2B2E26] text-sm">
                        {rfq.requirements.sampleRequired ? 'Sample Dispatched' : 'Bulk Only'}
                      </span>
                    </div>
                  </div>

                  {rfq.requirements.customizationNotes && (
                    <div className="p-4 bg-[#FAF6EF] border border-[#D9CBB8] text-xs font-montreal text-[#575C4E] leading-relaxed">
                      <strong className="text-[#2B2E26]">Customization Notes:</strong> {rfq.requirements.customizationNotes}
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-2 gap-2 text-xs font-montreal">
                    <span className="text-[#575C4E]">
                      Assigned Export Account Lead: <strong className="text-[#2B2E26]">Mr. Rajesh Verma (Export Director)</strong>
                    </span>
                    <a
                      href="https://wa.me/919876543210"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#B9694A] hover:underline font-semibold uppercase tracking-wider text-[0.6875rem] flex items-center gap-1.5"
                    >
                      <span>Inquire via WhatsApp Desk</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}


      {/* TAB 3: COMPANY PROFILE */}
      {activeTab === 'profile' && (
        <div className="max-w-3xl bg-white border border-[#D9CBB8] p-8 sm:p-12 space-y-8 shadow-sm">
          <div>
            <span className="label-caps font-montreal text-[#B9694A] block mb-1">
              Verified Commercial Profile
            </span>
            <h3 className="font-header text-2xl sm:text-3xl text-[#2B2E26]">Export Account Credentials</h3>
            <p className="text-sm font-montreal text-[#575C4E] mt-2">
              Keep your contact and destination shipping details updated for proforma documentation.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
            <div>
              <label className="label-caps font-montreal text-[#2B2E26] block mb-2">Company Legal Name</label>
              <input
                type="text"
                value={user.companyName}
                onChange={(e) => setUser({ ...user, companyName: e.target.value })}
                className="input-editorial"
              />
            </div>

            <div>
              <label className="label-caps font-montreal text-[#2B2E26] block mb-2">Primary Merchandiser / Buyer</label>
              <input
                type="text"
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
                className="input-editorial"
              />
            </div>

            <div>
              <label className="label-caps font-montreal text-[#2B2E26] block mb-2">Business Email</label>
              <input
                type="email"
                value={user.businessEmail}
                onChange={(e) => setUser({ ...user, businessEmail: e.target.value })}
                className="input-editorial"
              />
            </div>

            <div>
              <label className="label-caps font-montreal text-[#2B2E26] block mb-2">Phone / WhatsApp</label>
              <input
                type="tel"
                value={user.phone}
                onChange={(e) => setUser({ ...user, phone: e.target.value })}
                className="input-editorial"
              />
            </div>

            <div>
              <label className="label-caps font-montreal text-[#2B2E26] block mb-2">Country</label>
              <input
                type="text"
                value={user.country}
                onChange={(e) => setUser({ ...user, country: e.target.value })}
                className="input-editorial"
              />
            </div>

            <div>
              <label className="label-caps font-montreal text-[#2B2E26] block mb-2">Tax / VAT ID</label>
              <input
                type="text"
                value={user.taxId || ''}
                onChange={(e) => setUser({ ...user, taxId: e.target.value })}
                className="input-editorial"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-[#D9CBB8]">
            <button
              type="button"
              onClick={() => showToast('Company profile details saved.')}
              className="btn-terracotta py-3.5 px-8 text-xs font-montreal tracking-widest uppercase font-medium"
            >
              Save Profile Updates
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
