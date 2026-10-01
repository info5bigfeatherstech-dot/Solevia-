import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, ArrowRight, Building2, User, Mail, Globe, Phone, Lock } from 'lucide-react';
import { useStore } from '../store/useStore';
import { apiService } from '../services/apiService';

export const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    companyName: '',
    businessEmail: '',
    country: 'United States',
    phone: '',
    businessType: 'Boutique Chain',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { setUser, showToast } = useStore();
  const navigate = useNavigate();

  const countries = [
    'United States',
    'United Kingdom',
    'Australia',
    'France',
    'Germany',
    'Italy',
    'Spain',
    'United Arab Emirates',
    'Canada',
    'Netherlands',
    'Saudi Arabia',
    'Other International',
  ];

  const businessTypes = [
    'Boutique Chain',
    'Independent Resort Boutique',
    'Fashion Brand / Private Label',
    'Wholesale Importer & Distributor',
    'Department Store Group',
  ];

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.name || !formData.companyName || !formData.businessEmail || !formData.password) {
      setError('Please fill in all required company details.');
      return;
    }

    try {
      setLoading(true);
      const user = await apiService.registerBuyer(formData);
      setUser(user);
      showToast(`Buyer account created for ${user.companyName}!`);
      navigate('/account');
    } catch (err) {
      setError('Registration failed. Please contact export desk directly.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-12 bg-[#FAF6EF]">
      {/* Left Form */}
      <div className="lg:col-span-7 flex flex-col justify-between p-8 sm:p-14 lg:p-20 border-r border-[#D9CBB8]">
        <div>
          <Link to="/" className="inline-block mb-12">
            <span className="font-header text-2xl tracking-[0.16em] uppercase text-[#2B2E26]">
              Solevia
            </span>
            <span className="text-[0.625rem] font-montreal tracking-[0.3em] uppercase text-[#575C4E] block mt-0.5">
              Wholesale Registration
            </span>
          </Link>

          <div className="max-w-xl space-y-8">
            <div>
              <span className="label-caps font-montreal text-[#B9694A] block mb-2">
                B2B Trade Application
              </span>
              <h1 className="font-header text-3xl sm:text-4xl text-[#2B2E26] tracking-tight">
                Create an <span className="font-serif italic font-normal">Export</span> Buyer Account
              </h1>
              <p className="text-sm font-montreal text-[#575C4E] mt-3 leading-relaxed">
                Solevia Exports is exclusively an apparel manufacturer and wholesale exporter. Accounts are reserved for registered commercial businesses, boutiques, and fashion labels.
              </p>
            </div>

            {error && (
              <div className="p-4 bg-[#B9694A]/10 border border-[#B9694A]/40 text-xs font-montreal text-[#B9694A]">
                {error}
              </div>
            )}

            <form onSubmit={handleRegister} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="label-caps font-montreal text-[#2B2E26] block mb-2">
                    Contact Full Name *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Camilla Laurent"
                      className="input-editorial pl-10"
                    />
                    <User className="w-4 h-4 text-[#575C4E] absolute left-3 top-3.5" />
                  </div>
                </div>

                <div>
                  <label className="label-caps font-montreal text-[#2B2E26] block mb-2">
                    Company / Boutique Name *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      placeholder="e.g. Maison Mer Boutiques"
                      className="input-editorial pl-10"
                    />
                    <Building2 className="w-4 h-4 text-[#575C4E] absolute left-3 top-3.5" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="label-caps font-montreal text-[#2B2E26] block mb-2">
                    Business Email *
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      value={formData.businessEmail}
                      onChange={(e) => setFormData({ ...formData, businessEmail: e.target.value })}
                      placeholder="buyer@company.com"
                      className="input-editorial pl-10"
                    />
                    <Mail className="w-4 h-4 text-[#575C4E] absolute left-3 top-3.5" />
                  </div>
                </div>

                <div>
                  <label className="label-caps font-montreal text-[#2B2E26] block mb-2">
                    Phone / WhatsApp (with country code) *
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+1 212 555 0199"
                      className="input-editorial pl-10"
                    />
                    <Phone className="w-4 h-4 text-[#575C4E] absolute left-3 top-3.5" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="label-caps font-montreal text-[#2B2E26] block mb-2">
                    Country of Operation *
                  </label>
                  <div className="relative">
                    <select
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      className="input-editorial pl-10"
                    >
                      {countries.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                    <Globe className="w-4 h-4 text-[#575C4E] absolute left-3 top-3.5" />
                  </div>
                </div>

                <div>
                  <label className="label-caps font-montreal text-[#2B2E26] block mb-2">
                    Business Profile *
                  </label>
                  <select
                    value={formData.businessType}
                    onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                    className="input-editorial px-4"
                  >
                    {businessTypes.map((bt) => (
                      <option key={bt} value={bt}>{bt}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="label-caps font-montreal text-[#2B2E26] block mb-2">
                  Create Account Password *
                </label>
                <div className="relative">
                  <input
                    type="password"
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="Minimum 8 characters"
                    className="input-editorial pl-10"
                  />
                  <Lock className="w-4 h-4 text-[#575C4E] absolute left-3 top-3.5" />
                </div>
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-terracotta w-full py-4 text-xs font-montreal tracking-widest uppercase font-medium flex items-center justify-center gap-2"
                >
                  <span>{loading ? 'Submitting Application...' : 'Register Buyer Account'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>

            <div className="pt-6 border-t border-[#D9CBB8] flex items-center justify-between text-xs font-montreal text-[#575C4E]">
              <span>Already registered as a wholesale buyer?</span>
              <Link to="/login" className="text-[#B9694A] font-semibold hover:underline uppercase tracking-wider text-[0.6875rem]">
                Sign In →
              </Link>
            </div>
          </div>
        </div>

        <div className="pt-10 text-[0.6875rem] font-montreal text-[#575C4E] flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#A9BFB1]" />
          <span>Solevia Exports verification • No consumer retail access</span>
        </div>
      </div>

      {/* Right Editorial Image */}
      <div className="hidden lg:block lg:col-span-5 relative bg-[#2B2E26]">
        <img
          src="https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=80"
          alt="Apparel Design Atelier"
          className="w-full h-full object-cover brightness-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2B2E26]/85 via-transparent to-transparent" />
        <div className="absolute bottom-16 left-14 right-14 text-[#FAF6EF]">
          <span className="label-caps font-montreal text-[#A9BFB1] block mb-3">
            Wholesale Advantages
          </span>
          <h3 className="font-header text-2xl text-[#FAF6EF] mb-3 leading-snug">
            Gain immediate access to custom Pantone lab-dip requests, unbranded digital lookbooks, and volume FOB matrixes.
          </h3>
          <p className="text-xs font-montreal text-[#FAF6EF]/70 uppercase tracking-widest">
            OEM & ODM Manufacturing Partner
          </p>
        </div>
      </div>
    </div>
  );
};
