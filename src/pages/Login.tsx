import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Lock, Mail, ArrowRight, ShieldCheck } from 'lucide-react';
import { useStore } from '../store/useStore';
import { apiService } from '../services/apiService';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('buyer@maisonmer.fr');
  const [password, setPassword] = useState('wholesale2026');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSent, setForgotSent] = useState(false);

  const { setUser, showToast } = useStore();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please provide your business email and password.');
      return;
    }

    try {
      setLoading(true);
      const user = await apiService.loginBuyer(email);
      setUser(user);
      showToast(`Welcome back, ${user.name} (${user.companyName})`);
      navigate('/account');
    } catch (err) {
      setError('Invalid buyer credentials or unverified export account.');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail) return;
    setForgotSent(true);
    showToast('Password reset link sent to your registered business email.');
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-12 bg-[#FAF6EF]">
      {/* Left Form Column */}
      <div className="lg:col-span-6 flex flex-col justify-between p-8 sm:p-14 lg:p-20 border-r border-[#D9CBB8]">
        <div>
          <Link to="/" className="inline-block mb-14">
            <span className="font-header text-3xl tracking-[0.16em] uppercase text-[#2B2E26] block font-light">
              Solevia
            </span>
            <span className="text-[0.625rem] tracking-[0.35em] uppercase text-[#575C4E] block font-montreal mt-1">
              Buyer Portal
            </span>
          </Link>

          <div className="max-w-md space-y-8">
            <div>
              <span className="label-caps text-[#B9694A] block mb-2">
                Authorized Access Only
              </span>
              <h1 className="editorial-title text-4xl sm:text-5xl text-[#2B2E26]">
                International <em>Buyer</em> Login
              </h1>
              <p className="text-xs sm:text-sm text-[#575C4E] mt-3 leading-relaxed font-montreal">
                Access your submitted RFQs, track pre-production sample dispatches, and download proprietary wholesale line sheets.
              </p>
            </div>

            {error && (
              <div className="p-4 bg-[#B9694A]/10 border border-[#B9694A]/40 text-xs sm:text-sm text-[#B9694A] font-montreal">
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="label-caps text-[#2B2E26] block mb-2">
                  Business Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="buyer@company.com"
                    className="w-full bg-white border border-[#D9CBB8] pl-11 pr-4 py-3 text-xs sm:text-sm text-[#2B2E26] placeholder-[#575C4E]/60 focus:outline-none focus:border-[#B9694A] font-montreal"
                  />
                  <Mail className="w-4 h-4 text-[#575C4E] absolute left-3.5 top-3.5" />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="label-caps text-[#2B2E26]">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => setIsForgotModalOpen(true)}
                    className="text-xs text-[#B9694A] hover:underline font-montreal"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full bg-white border border-[#D9CBB8] pl-11 pr-11 py-3 text-xs sm:text-sm text-[#2B2E26] focus:outline-none focus:border-[#B9694A] font-montreal"
                  />
                  <Lock className="w-4 h-4 text-[#575C4E] absolute left-3.5 top-3.5" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3.5 text-[#575C4E] hover:text-[#2B2E26]"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-terracotta w-full py-3.5 text-xs tracking-wider flex items-center justify-center gap-2"
                >
                  <span>{loading ? 'Authenticating...' : 'Sign In to Buyer Portal'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>

            <div className="pt-6 border-t border-[#D9CBB8] flex items-center justify-between text-xs sm:text-sm text-[#575C4E] font-montreal">
              <span>New boutique or buyer?</span>
              <Link to="/register" className="text-[#B9694A] font-medium hover:underline uppercase tracking-wider text-xs">
                Create Buyer Account →
              </Link>
            </div>
          </div>
        </div>

        <div className="pt-10 text-xs text-[#575C4E] flex items-center gap-2.5 font-montreal">
          <ShieldCheck className="w-4 h-4 text-[#A9BFB1]" />
          <span>Encrypted B2B Wholesale Portal • Strictly Non-Retail</span>
        </div>
      </div>

      {/* Right Editorial Image */}
      <div className="hidden lg:block lg:col-span-6 relative bg-[#2B2E26]">
        <img
          src="https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=1200&q=80"
          alt="Solevia Factory Editorial"
          className="w-full h-full object-cover brightness-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2B2E26]/85 via-transparent to-transparent" />
        <div className="absolute bottom-16 left-16 right-16 text-[#FAF6EF] space-y-3">
          <span className="label-caps text-[#A9BFB1] block">
            Solevia Exports Global Network
          </span>
          <h3 className="font-header text-3xl sm:text-4xl text-[#FAF6EF] leading-snug">
            Partnering with over 200+ multi-brand boutiques and private labels across 26 countries.
          </h3>
          <p className="text-xs sm:text-sm text-[#D9CBB8] font-montreal">
            Direct export pricing • Pre-production sampling in 5-7 days • Strict AQL 2.5 Major QC
          </p>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {isForgotModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2B2E26]/60 backdrop-blur-xs">
          <div className="bg-[#FAF6EF] border border-[#D9CBB8] p-6 max-w-sm w-full space-y-4 shadow-2xl">
            <h3 className="font-serif text-xl text-[#2B2E26]">Reset Buyer Password</h3>
            {forgotSent ? (
              <div className="text-xs text-[#575C4E] space-y-3">
                <p>A password reset link has been dispatched to <strong>{forgotEmail}</strong>.</p>
                <button
                  type="button"
                  onClick={() => {
                    setIsForgotModalOpen(false);
                    setForgotSent(false);
                  }}
                  className="btn-terracotta w-full py-2 text-xs"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleForgotPassword} className="space-y-3">
                <p className="text-xs text-[#575C4E]">
                  Enter your registered business email. Our export administration desk will issue a secure reset link.
                </p>
                <input
                  type="email"
                  required
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full bg-white border border-[#D9CBB8] px-3 py-2 text-xs text-[#2B2E26] focus:outline-none focus:border-[#B9694A]"
                />
                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsForgotModalOpen(false)}
                    className="btn-outline flex-1 py-2 text-xs"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-terracotta flex-1 py-2 text-xs"
                  >
                    Send Link
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
