import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  FileDown,
  Layers,
  Clock,
  ShieldCheck,
  Package,
  Plus,
  AlertTriangle,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { apiService } from '../services/apiService';
import { useStore } from '../store/useStore';
import { Product } from '../types';
import { ProductCard } from '../components/ProductCard';
import { PRODUCTS } from '../data/products';
import { scrollToTop } from '../components/SmoothScroll';

export const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const initialProduct = PRODUCTS.find((p) => p.id === id) || null;
  const [product, setProduct] = useState<Product | null>(initialProduct);
  const [related, setRelated] = useState<Product[]>([]);
  const [loading, setLoading] = useState(!initialProduct);

  // User selections
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(initialProduct?.colors[0]?.name || '');
  const [selectedSize, setSelectedSize] = useState(initialProduct?.sizes[0] || 'M');
  const [orderQty, setOrderQty] = useState(initialProduct?.moq || 300);
  const [sizeDistribution, setSizeDistribution] = useState<Record<string, number>>({});
  const [isSampleRequested, setIsSampleRequested] = useState(false);

  const {
    addToInquiry,
    showToast,
  } = useStore();

  useEffect(() => {
    scrollToTop();
    if (!id) return;

    const data = PRODUCTS.find((p) => p.id === id);
    if (data) {
      setProduct(data);
      setSelectedColor(data.colors[0]?.name || '');
      setSelectedSize(data.sizes[0] || 'M');
      setOrderQty(data.moq);

      // Distribute initial sizes evenly
      const initialSizes: Record<string, number> = {};
      const count = data.sizes.length || 1;
      const perSize = Math.floor(data.moq / count);
      let remainder = data.moq % count;
      data.sizes.forEach((s) => {
        initialSizes[s] = perSize + (remainder > 0 ? 1 : 0);
        if (remainder > 0) remainder--;
      });
      setSizeDistribution(initialSizes);

      // Related products
      apiService.getRelatedProducts(data.category, data.id, 4).then(setRelated);
      setLoading(false);
    } else {
      setLoading(false);
    }

    scrollToTop();
    const rafId = requestAnimationFrame(() => {
      scrollToTop();
    });
    return () => cancelAnimationFrame(rafId);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen py-20 px-4 max-w-7xl mx-auto flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-8 h-8 border-2 border-[#B9694A] border-t-transparent animate-spin mx-auto"></div>
          <span className="label-caps text-[#575C4E] block">Loading Style Specifications...</span>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen py-24 px-4 text-center max-w-md mx-auto space-y-4">
        <h2 className="font-serif text-3xl text-[#2B2E26]">Style Not Found</h2>
        <p className="text-xs text-[#575C4E]">The requested style code could not be located in our wholesale registry.</p>
        <Link to="/collections" className="btn-terracotta text-xs">Return to Catalog</Link>
      </div>
    );
  }

  const isBelowMoq = orderQty < product.moq;

  // Recalculate size ratio when total quantity changes
  const handleQuantityChange = (newQty: number) => {
    const val = Math.max(0, newQty);
    setOrderQty(val);
    const count = product.sizes.length || 1;
    const factor = val / (orderQty || 1);
    const updated: Record<string, number> = {};
    product.sizes.forEach((s) => {
      const current = sizeDistribution[s] || Math.floor(val / count);
      updated[s] = Math.max(0, Math.round(current * factor));
    });
    setSizeDistribution(updated);
  };




  const handleAddToInquiry = () => {
    addToInquiry(product, selectedColor, orderQty, sizeDistribution);
  };

  const handleRequestSample = () => {
    setIsSampleRequested(true);
    addToInquiry(product, selectedColor, 1, { [product.sizes[0] || 'M']: 1 });
    showToast(`Added sample request for ${product.styleCode}`);
  };

  const handleDownloadSpecSheet = () => {
    const content = `SOLEVIA EXPORTS - TECHNICAL SPEC SHEET
=============================================
Style Code: ${product.styleCode}
Style Name: ${product.name}
Category: ${product.categoryLabel}
Subcategory: ${product.subcategory}
Fabric: ${product.fabric}
Composition: ${product.composition}
Weight/GSM: ${product.gsm}
Colors: ${product.colors.map((c) => c.name).join(', ')}
Available Sizes: ${product.sizes.join(', ')}
Minimum Order Quantity: ${product.moq} ${product.moqUnit}
Lead Time: ${product.productionLeadTime}
Sample Time: ${product.sampleLeadTime}
Packaging: ${product.packaging}
Customization Options:
${product.customizationOptions.map((o) => ` - ${o}`).join('\n')}

For wholesale orders, contact export-desk@soleviaexports.com
=============================================`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${product.styleCode}_SpecSheet.txt`;
    a.click();
    showToast(`Downloaded technical spec sheet for ${product.styleCode}`);
  };

  return (
    <div className="editorial-container min-h-screen py-14 sm:py-20 lg:py-24">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center space-x-2 text-[0.6875rem] uppercase tracking-wider text-[#575C4E] mb-10 font-montreal">
        <Link to="/" className="hover:text-[#B9694A]">Home</Link>
        <span>/</span>
        <Link to="/collections" className="hover:text-[#B9694A]">Collections</Link>
        <span>/</span>
        <Link to={`/category/${product.category}`} className="hover:text-[#B9694A]">
          {product.categoryLabel}
        </Link>
        <span>/</span>
        <span className="text-[#2B2E26] font-medium">{product.styleCode}</span>
      </nav>

      {/* Main Product Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start pb-20 border-b border-[#D9CBB8]">
        {/* Left: Image Gallery */}
        <div className="lg:col-span-7 space-y-5">
          {/* Main Large Image */}
          <div className="relative aspect-[3/4] bg-[#EAE0D0] overflow-hidden border border-[#D9CBB8]">
            <img
              src={product.images[selectedImageIndex] || product.images[0]}
              alt={`${product.name} wholesale apparel`}
              className="w-full h-full object-cover"
            />
            {/* MOQ Tag Overlay */}
            <div className="absolute top-5 left-5 bg-[#FAF6EF]/95 backdrop-blur-xs px-3.5 py-1.5 text-xs uppercase tracking-wider font-medium text-[#2B2E26] border border-[#D9CBB8] font-montreal">
              Factory MOQ: {product.moq} {product.moqUnit}
            </div>
          </div>

          {/* Thumbnails row */}
          {product.images.length > 1 && (
            <div className="flex gap-3.5 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`w-20 h-24 overflow-hidden border shrink-0 transition-all ${
                    selectedImageIndex === idx
                      ? 'border-[#2B2E26] ring-1 ring-[#2B2E26]'
                      : 'border-[#D9CBB8] opacity-75 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Download spec sheet bar */}
          <div className="pt-3 flex items-center justify-between text-xs text-[#575C4E] border-t border-[#D9CBB8] font-montreal">
            <span>Need tech pack specs or factory pattern markers?</span>
            <button
              type="button"
              onClick={handleDownloadSpecSheet}
              className="text-[#B9694A] hover:underline uppercase tracking-wider font-medium flex items-center gap-1.5"
            >
              <FileDown className="w-4 h-4" />
              <span>Download Spec Sheet</span>
            </button>
          </div>
        </div>

        {/* Right: Wholesale Specs & Ordering Controls */}
        <div className="lg:col-span-5 space-y-7">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="label-caps text-[#B9694A] font-semibold">
                {product.styleCode}
              </span>
              <span className="text-[#D9CBB8]">•</span>
              <span className="label-caps text-[#575C4E]">
                {product.subcategory}
              </span>
              <span className="text-[#D9CBB8]">•</span>
              <span className="label-caps text-[#575C4E]">
                {product.season}
              </span>
            </div>

            <h1 className="editorial-title text-3xl sm:text-4xl lg:text-5xl text-[#2B2E26]">
              {product.name}
            </h1>

            <p className="text-xs sm:text-sm text-[#575C4E] mt-3 leading-relaxed font-montreal">
              {product.description}
            </p>
          </div>



          {/* Color Swatches Selector */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="label-caps text-[#2B2E26]">Selected Colorway:</span>
              <span className="font-medium text-[#B9694A]">{selectedColor}</span>
            </div>

            <div className="flex flex-wrap gap-2.5">
              {product.colors.map((c) => (
                <button
                  key={c.name}
                  type="button"
                  onClick={() => setSelectedColor(c.name)}
                  className={`flex items-center gap-2 px-3 py-1.5 border text-xs transition-colors ${
                    selectedColor === c.name
                      ? 'border-[#2B2E26] bg-[#2B2E26] text-[#FAF6EF]'
                      : 'border-[#D9CBB8] bg-white text-[#2B2E26] hover:border-[#2B2E26]'
                  }`}
                >
                  <span
                    className="w-3 h-3 rounded-none border border-black/20"
                    style={{ backgroundColor: c.hex }}
                  />
                  <span>{c.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Size Selector Buttons */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="label-caps text-[#2B2E26]">Select Size:</span>
              <span className="font-medium text-[#B9694A]">{selectedSize}</span>
            </div>

            <div className="flex flex-wrap gap-2.5">
              {product.sizes.map((sz) => (
                <button
                  key={sz}
                  type="button"
                  onClick={() => setSelectedSize(sz)}
                  className={`min-w-12 h-10 px-3.5 flex items-center justify-center border text-xs font-montreal font-semibold uppercase tracking-wider transition-colors ${
                    selectedSize === sz
                      ? 'border-[#2B2E26] bg-[#2B2E26] text-[#FAF6EF]'
                      : 'border-[#D9CBB8] bg-white text-[#2B2E26] hover:border-[#2B2E26]'
                  }`}
                >
                  {sz}
                </button>
              ))}
            </div>
          </div>

          {/* Order Quantity & Total */}
          <div className="space-y-2 pt-2">
            <div className="flex items-center justify-between gap-4">
              <div className="flex-1">
                <label className="label-caps text-[#2B2E26] block mb-1">
                  Total Order Quantity:
                </label>
                <div className="flex items-center border border-[#D9CBB8] bg-white">
                  <button
                    type="button"
                    onClick={() => handleQuantityChange(orderQty - 50)}
                    className="px-3 py-2 text-sm text-[#2B2E26] hover:bg-[#EAE0D0]"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="0"
                    step="50"
                    value={orderQty}
                    onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 0)}
                    className="w-full text-center font-medium text-sm text-[#2B2E26] py-2 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => handleQuantityChange(orderQty + 50)}
                    className="px-3 py-2 text-sm text-[#2B2E26] hover:bg-[#EAE0D0]"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="text-right">
                <span className="label-caps text-[#575C4E] block mb-1">
                  Factory MOQ:
                </span>
                <span className="font-header text-xl font-medium text-[#2B2E26]">
                  {product.moq} {product.moqUnit}
                </span>
              </div>
            </div>

            {/* Warning if below MOQ */}
            {isBelowMoq && (
              <div className="bg-[#B9694A]/10 border border-[#B9694A]/30 p-2.5 flex items-center gap-2 text-xs text-[#B9694A]">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>
                  Below factory MOQ of {product.moq} {product.moqUnit}. Bulk production pricing requires minimum order.
                </span>
              </div>
            )}
          </div>

          {/* Action Buttons: Request Quotation & Request Sample */}
          <div className="space-y-3 pt-2">
            <Link
              to={`/contact?style=${product.styleCode}&qty=${orderQty}`}
              className="btn-terracotta w-full py-3 text-xs tracking-wider flex items-center justify-center gap-2 shadow-none"
            >
              <span>Request Bulk Quotation ({orderQty} {product.moqUnit}) →</span>
            </Link>

            <div className="flex justify-center">
              <Link
                to={`/contact?style=${product.styleCode}&type=sample`}
                className="px-5 py-2 border border-[#2B2E26]/40 hover:border-[#2B2E26] text-[#2B2E26] hover:bg-[#2B2E26] hover:text-[#FAF6EF] text-xs font-montreal tracking-wider uppercase transition-colors inline-flex items-center justify-center gap-1.5"
              >
                <span>Request Sample</span>
              </Link>
            </div>
          </div>

          {/* Production Logistics Badges */}
          <div className="grid grid-cols-2 gap-3 pt-4 border-t border-[#D9CBB8] text-xs text-[#575C4E]">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#A9BFB1]" />
              <span>Bulk: {product.productionLeadTime}</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#A9BFB1]" />
              <span>Sample: {product.sampleLeadTime}</span>
            </div>
            <div className="flex items-center gap-2">
              <Package className="w-4 h-4 text-[#A9BFB1]" />
              <span>Export Packaging Included</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#A9BFB1]" />
              <span>AQL 2.5 Major QC</span>
            </div>
          </div>
        </div>
      </div>

      {/* Deep Specification Table */}
      <div className="py-20 sm:py-28 border-b border-[#D9CBB8]">
        <div className="max-w-4xl mx-auto space-y-10">
          <div>
            <span className="label-caps text-[#B9694A] block mb-2">
              Manufacturing Blueprint
            </span>
            <h3 className="font-header text-3xl sm:text-4xl text-[#2B2E26]">
              Technical Specifications &amp; Quality Parameters
            </h3>
          </div>

          <div className="border border-[#D9CBB8] divide-y divide-[#D9CBB8] bg-[#FAF6EF] text-xs sm:text-sm font-montreal">
            <div className="grid grid-cols-1 sm:grid-cols-3 p-4 sm:p-5">
              <span className="font-medium text-[#575C4E] uppercase tracking-wider text-xs">
                Fabric Construction
              </span>
              <span className="sm:col-span-2 text-[#2B2E26]">
                {product.fabric}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 p-4 sm:p-5">
              <span className="font-medium text-[#575C4E] uppercase tracking-wider text-xs">
                Fiber Composition
              </span>
              <span className="sm:col-span-2 text-[#2B2E26]">
                {product.composition}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 p-4 sm:p-5">
              <span className="font-medium text-[#575C4E] uppercase tracking-wider text-xs">
                Weight / GSM
              </span>
              <span className="sm:col-span-2 text-[#2B2E26]">
                {product.gsm}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 p-4 sm:p-5">
              <span className="font-medium text-[#575C4E] uppercase tracking-wider text-xs">
                Size Range
              </span>
              <span className="sm:col-span-2 text-[#2B2E26]">
                {product.sizes.join(', ')} (Custom size grading charts accepted)
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 p-4 sm:p-5">
              <span className="font-medium text-[#575C4E] uppercase tracking-wider text-xs">
                Packaging Standards
              </span>
              <span className="sm:col-span-2 text-[#2B2E26]">
                {product.packaging}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 p-4 sm:p-5">
              <span className="font-medium text-[#575C4E] uppercase tracking-wider text-xs">
                OEM Customizations
              </span>
              <span className="sm:col-span-2 text-[#2B2E26] space-y-1">
                {product.customizationOptions.map((opt, i) => (
                  <span key={i} className="block">• {opt}</span>
                ))}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Related Styles Carousel/Grid */}
      {related.length > 0 && (
        <div className="py-20 sm:py-28">
          <div className="flex items-center justify-between pb-8 mb-12 border-b border-[#D9CBB8]">
            <div>
              <span className="label-caps text-[#B9694A] block mb-2">
                Complementary Styles
              </span>
              <h3 className="font-header text-3xl sm:text-4xl text-[#2B2E26]">
                Related {product.categoryLabel}
              </h3>
            </div>
            <Link
              to={`/category/${product.category}`}
              className="sliding-link text-xs font-montreal"
            >
              View All {product.categoryLabel} →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
            {related.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </div>
      )}

      {/* Sticky Mobile Add to Inquiry Bar */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 bg-[#FAF6EF] border-t border-[#D9CBB8] p-3 z-30 shadow-xl flex items-center justify-between gap-3">
        <div>
          <span className="label-caps text-[#B9694A] block">{product.styleCode}</span>
          <span className="text-xs uppercase tracking-wider font-montreal font-semibold text-[#575C4E]">
            Factory MOQ: {product.moq} {product.moqUnit}
          </span>
        </div>

        <Link
          to={`/contact?style=${product.styleCode}&qty=${orderQty}`}
          className="btn-terracotta py-2.5 px-4 text-xs tracking-wider"
        >
          Request Quote
        </Link>
      </div>
    </div>
  );
};
