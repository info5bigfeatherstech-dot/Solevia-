import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Clock, Layers } from 'lucide-react';
import { PRODUCTS, CATEGORIES_CONFIG } from '../data/products';
import { ProductCard } from '../components/ProductCard';

export const CategoryLanding: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const categoryInfo = useMemo(() => {
    return CATEGORIES_CONFIG.find((c) => c.id === id) || CATEGORIES_CONFIG[0];
  }, [id]);

  const categoryProducts = useMemo(() => {
    return PRODUCTS.filter((p) => p.category === categoryInfo.id);
  }, [categoryInfo.id]);

  return (
    <div className="min-h-screen">
      {/* Category Hero */}
      <section className="relative bg-[#2B2E26] text-[#FAF6EF] py-24 sm:py-32 lg:py-36 border-b border-[#3B3F34]">
        <div className="editorial-container grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#A9BFB1] font-montreal">
              <Link to="/collections" className="hover:underline">
                Collections
              </Link>
              <span>/</span>
              <span>{categoryInfo.name}</span>
            </div>

            <h1 className="editorial-title text-4xl sm:text-6xl lg:text-7xl text-[#FAF6EF]">
              {categoryInfo.name}
            </h1>

            <p className="font-header text-xl sm:text-3xl text-[#D9CBB8] italic font-light">
              "{categoryInfo.tagline}"
            </p>

            <p className="text-xs sm:text-sm text-[#D9CBB8]/90 max-w-xl leading-relaxed font-montreal">
              {categoryInfo.description} Manufactured in accordance with international AQL 2.5 major quality standards. Fully customizable with your brand labels, custom Pantone dyeing, and exclusive prints.
            </p>

            <div className="flex flex-wrap items-center gap-6 pt-4 text-xs sm:text-sm text-[#FAF6EF] font-montreal">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#B9694A]" />
                <span>MOQ: {categoryInfo.moq}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#A9BFB1]" />
                <span>Lead Time: {categoryInfo.leadTime}</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#A9BFB1]" />
                <span>Quality: AQL 2.5 Major</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="aspect-[4/3] bg-[#3B3F34] overflow-hidden border border-[#D9CBB8]/40 shadow-xl">
              <img
                src={categoryInfo.image}
                alt={categoryInfo.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Production Grid */}
      <section className="section-spacing editorial-container">
        <div className="flex items-center justify-between pb-8 mb-12 border-b border-[#D9CBB8]">
          <div>
            <span className="label-caps text-[#B9694A] block mb-2">
              Active Production Styles
            </span>
            <h2 className="font-header text-3xl sm:text-4xl text-[#2B2E26]">
              {categoryProducts.length} Wholesale Styles Available
            </h2>
          </div>
          <Link
            to="/contact"
            className="btn-terracotta text-xs hidden sm:inline-flex py-3.5 px-8"
          >
            <span>Request Bulk Quotation</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {categoryProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              aspectRatio={product.aspectRatio || 'portrait'}
            />
          ))}
        </div>
      </section>

      {/* OEM Customization Note for Category */}
      <section className="bg-[#EAE0D0]/40 border-t border-[#D9CBB8] py-24 sm:py-32">
        <div className="editorial-container max-w-4xl mx-auto text-center space-y-6">
          <span className="label-caps text-[#B9694A]">
            Bespoke OEM Development
          </span>
          <h3 className="font-header text-3xl sm:text-5xl text-[#2B2E26]">
            Looking for Custom Variations in {categoryInfo.name}?
          </h3>
          <p className="text-xs sm:text-sm text-[#575C4E] leading-relaxed max-w-xl mx-auto font-montreal">
            Our pattern makers and sample room can alter cup shapes, torso lengths, sleeve proportions, and pocket configurations based on your technical specs.
          </p>
          <div className="pt-4">
            <Link to="/private-label" className="btn-outline text-xs py-3.5 px-8">
              Explore Private Label &amp; Tech Pack Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
