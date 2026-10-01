import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, Trash2, AlertTriangle, ArrowRight, Layers, Sliders } from 'lucide-react';
import { useStore } from '../store/useStore';
import { InquiryItem } from '../types';

export const InquiryDrawer: React.FC = () => {
  const {
    inquiryItems,
    isDrawerOpen,
    setDrawerOpen,
    removeFromInquiry,
    updateInquiryQty,
    updateInquirySizeRatio,
    clearInquiry,
  } = useStore();

  const [editingRatioItemId, setEditingRatioItemId] = useState<string | null>(null);
  const navigate = useNavigate();

  if (!isDrawerOpen) return null;

  // Calculate indicative FOB total (for estimation only)
  const indicativeTotal = inquiryItems.reduce((acc, item) => {
    // Find matching tier
    const tiers = item.product.fobPriceTiers;
    let unitPrice = item.product.fobStartingPrice;
    if (tiers && tiers.length > 0) {
      for (const t of tiers) {
        if (item.quantity >= t.minQty) {
          unitPrice = t.price;
        }
      }
    }
    return acc + unitPrice * item.quantity;
  }, 0);

  const totalPieces = inquiryItems.reduce((acc, i) => acc + i.quantity, 0);

  // Check if any item is below MOQ
  const itemsBelowMoq = inquiryItems.filter((i) => i.quantity < i.product.moq);

  const handleProceedToRFQ = () => {
    setDrawerOpen(false);
    navigate('/contact');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#2B2E26]/50 backdrop-blur-xs transition-opacity duration-300"
        onClick={() => setDrawerOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <div className="w-screen max-w-md md:max-w-lg bg-[#FAF6EF] border-l border-[#D9CBB8] flex flex-col shadow-2xl">
          {/* Drawer Header */}
          <div className="p-6 sm:p-7 border-b border-[#D9CBB8] flex items-center justify-between bg-[#EAE0D0]/50">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-header text-2xl font-normal text-[#2B2E26]">
                  Wholesale Inquiry List
                </span>
                <span className="text-[0.625rem] font-montreal font-semibold bg-[#2B2E26] text-[#FAF6EF] px-2 py-0.5 tracking-wider uppercase">
                  B2B
                </span>
              </div>
              <p className="text-xs font-montreal text-[#575C4E] mt-1">
                {inquiryItems.length} {inquiryItems.length === 1 ? 'Style' : 'Styles'} selected • {totalPieces} Total Units
              </p>
            </div>
            <button
              type="button"
              onClick={() => setDrawerOpen(false)}
              className="p-2 text-[#2B2E26] hover:text-[#B9694A] transition-colors"
              aria-label="Close inquiry drawer"
            >
              <X className="w-5 h-5 stroke-[1.5]" />
            </button>
          </div>

          {/* Warning banner if items below MOQ */}
          {itemsBelowMoq.length > 0 && (
            <div className="bg-[#B9694A]/10 border-b border-[#B9694A]/30 p-4 px-6 flex items-start gap-3">
              <AlertTriangle className="w-4 h-4 text-[#B9694A] shrink-0 mt-0.5" />
              <p className="text-xs font-montreal text-[#2B2E26] leading-relaxed">
                <span className="font-semibold text-[#B9694A]">Attention:</span> One or more styles are set below factory MOQ. Bulk FOB export pricing requires meeting the MOQ per style.
              </p>
            </div>
          )}

          {/* Drawer Body - Items List */}
          <div className="flex-1 overflow-y-auto p-6 sm:p-7 space-y-6 divide-y divide-[#D9CBB8]">
            {inquiryItems.length === 0 ? (
              <div className="py-20 text-center space-y-5">
                <div className="w-14 h-14 border border-[#D9CBB8] bg-[#EAE0D0]/50 mx-auto flex items-center justify-center text-[#575C4E]">
                  <Layers className="w-7 h-7 stroke-[1.5]" />
                </div>
                <div>
                  <h3 className="font-header text-xl sm:text-2xl text-[#2B2E26]">
                    Your Inquiry List is Empty
                  </h3>
                  <p className="text-xs font-montreal text-[#575C4E] max-w-xs mx-auto mt-2 leading-relaxed">
                    Explore our wholesale collections and add styles to build your custom production quote request.
                  </p>
                </div>
                <div className="pt-3">
                  <Link
                    to="/collections"
                    onClick={() => setDrawerOpen(false)}
                    className="btn-terracotta text-xs font-montreal tracking-wider uppercase py-3 px-6 inline-block"
                  >
                    Browse Collections
                  </Link>
                </div>
              </div>
            ) : (
              inquiryItems.map((item) => {
                const isUnderMoq = item.quantity < item.product.moq;
                const isEditingRatio = editingRatioItemId === item.id;

                return (
                  <div key={item.id} className="pt-5 first:pt-0 space-y-4">
                    <div className="flex gap-4">
                      {/* Thumbnail */}
                      <Link
                        to={`/product/${item.product.id}`}
                        onClick={() => setDrawerOpen(false)}
                        className="w-20 h-26 bg-[#EAE0D0] overflow-hidden shrink-0 border border-[#D9CBB8] block"
                      >
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </Link>

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <span className="label-caps font-montreal text-[#B9694A] block">
                              {item.product.styleCode}
                            </span>
                            <Link
                              to={`/product/${item.product.id}`}
                              onClick={() => setDrawerOpen(false)}
                              className="font-header text-base text-[#2B2E26] hover:text-[#B9694A] transition-colors line-clamp-1"
                            >
                              {item.product.name}
                            </Link>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeFromInquiry(item.id)}
                            className="text-[#575C4E] hover:text-[#B9694A] p-1.5"
                            title="Remove from inquiry"
                          >
                            <Trash2 className="w-4 h-4 stroke-[1.5]" />
                          </button>
                        </div>

                        {/* Color & MOQ Meta */}
                        <div className="flex flex-wrap items-center gap-2 mt-1.5 text-xs font-montreal text-[#575C4E]">
                          <span className="flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-none border border-[#2B2E26]/20 bg-[#B9694A] inline-block"></span>
                            {item.selectedColor}
                          </span>
                          <span>•</span>
                          <span>MOQ: {item.product.moq} {item.product.moqUnit}</span>
                        </div>

                        {/* Quantity input & MOQ status */}
                        <div className="mt-4 flex items-center justify-between gap-3">
                          <div className="flex items-center gap-2">
                            <label className="text-xs font-montreal uppercase tracking-wider text-[#575C4E]">
                              Order Qty:
                            </label>
                            <div className="flex items-center border border-[#D9CBB8] bg-white">
                              <button
                                type="button"
                                onClick={() => updateInquiryQty(item.id, Math.max(50, item.quantity - 50))}
                                className="px-2.5 py-1 text-xs text-[#2B2E26] hover:bg-[#EAE0D0] transition-colors"
                              >
                                -
                              </button>
                              <input
                                type="number"
                                min="50"
                                step="50"
                                value={item.quantity}
                                onChange={(e) => updateInquiryQty(item.id, parseInt(e.target.value) || 0)}
                                className="w-16 text-center text-xs py-1.5 font-medium text-[#2B2E26] focus:outline-none"
                              />
                              <button
                                type="button"
                                onClick={() => updateInquiryQty(item.id, item.quantity + 50)}
                                className="px-2.5 py-1 text-xs text-[#2B2E26] hover:bg-[#EAE0D0] transition-colors"
                              >
                                +
                              </button>
                            </div>
                            <span className="text-xs font-montreal text-[#575C4E]">{item.product.moqUnit}</span>
                          </div>

                          {/* Toggle Size Ratio Button */}
                          <button
                            type="button"
                            onClick={() => setEditingRatioItemId(isEditingRatio ? null : item.id)}
                            className="text-xs font-montreal uppercase tracking-wider text-[#B9694A] hover:underline flex items-center gap-1.5 font-medium"
                          >
                            <Sliders className="w-3.5 h-3.5" />
                            {isEditingRatio ? 'Done' : 'Ratio'}
                          </button>
                        </div>

                        {isUnderMoq && (
                          <div className="mt-2 text-xs font-montreal text-[#B9694A] font-medium flex items-center gap-1.5">
                            <span>⚠ Below factory MOQ of {item.product.moq} {item.product.moqUnit}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Collapsible Size Ratio Breakdown Editor */}
                    {isEditingRatio ? (
                      <div className="bg-[#EAE0D0]/50 p-4 border border-[#D9CBB8] text-xs font-montreal space-y-3">
                        <div className="flex items-center justify-between text-[0.6875rem] uppercase tracking-wider text-[#575C4E] font-medium">
                          <span>Adjust Size Quantities:</span>
                          <span>Sum: {Object.values(item.sizeRatio).reduce((a, b) => a + b, 0)} pcs</span>
                        </div>
                        <div className="grid grid-cols-5 gap-2">
                          {item.product.sizes.map((sz) => (
                            <div key={sz} className="text-center">
                              <span className="block text-[0.625rem] text-[#575C4E] mb-1 font-semibold">{sz}</span>
                              <input
                                type="number"
                                min="0"
                                value={item.sizeRatio[sz] || 0}
                                onChange={(e) =>
                                  updateInquirySizeRatio(item.id, sz, parseInt(e.target.value) || 0)
                                }
                                className="w-full text-center text-xs py-1.5 border border-[#D9CBB8] bg-white font-medium"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      /* Compact Size Ratio Summary Pills */
                      <div className="flex flex-wrap gap-2 text-xs font-montreal text-[#575C4E] pt-1">
                        {Object.entries(item.sizeRatio).map(([sz, qty]) => (
                          <span key={sz} className="px-2 py-0.5 bg-[#EAE0D0] border border-[#D9CBB8]">
                            {sz}: <strong className="text-[#2B2E26] font-medium">{qty}</strong>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>

          {/* Drawer Footer */}
          {inquiryItems.length > 0 && (
            <div className="p-6 sm:p-7 border-t border-[#D9CBB8] bg-[#EAE0D0]/50 space-y-4">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-montreal text-[#575C4E]">
                  <span>Total Order Volume:</span>
                  <span className="font-semibold text-[#2B2E26]">{totalPieces} units</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-header text-base text-[#2B2E26]">Commercial Terms:</span>
                  <span className="font-montreal text-sm font-semibold text-[#B9694A] uppercase tracking-wider">
                    Direct Factory Quotation
                  </span>
                </div>
                <p className="text-[0.625rem] font-montreal text-[#575C4E] italic tracking-wide">
                  * Estimated, subject to final formal quotation, fabric choice, port destination &amp; packing terms.
                </p>
              </div>

              <div className="space-y-3 pt-1">
                <button
                  type="button"
                  onClick={handleProceedToRFQ}
                  className="btn-terracotta w-full py-4 text-xs font-montreal tracking-widest uppercase font-medium flex items-center justify-center gap-2 shadow-none"
                >
                  <span>Request Formal Quotation</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="flex items-center justify-between pt-1">
                  <button
                    type="button"
                    onClick={() => setDrawerOpen(false)}
                    className="text-xs font-montreal uppercase tracking-wider text-[#575C4E] hover:text-[#2B2E26] transition-colors underline"
                  >
                    Continue Browsing
                  </button>

                  <button
                    type="button"
                    onClick={clearInquiry}
                    className="text-xs font-montreal uppercase tracking-wider text-[#B9694A] hover:underline"
                  >
                    Clear All
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
