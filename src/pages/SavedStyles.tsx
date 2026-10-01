import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Plus, Trash2, ArrowRight } from 'lucide-react';
import { useStore } from '../store/useStore';
import { PRODUCTS } from '../data/products';

export const SavedStyles: React.FC = () => {
  const { savedStyleCodes, toggleSaveStyle, addToInquiry } = useStore();

  const savedProducts = PRODUCTS.filter((p) =>
    savedStyleCodes.includes(p.styleCode)
  );

  return (
    <div className="editorial-container min-h-screen py-14 sm:py-20 lg:py-24">
      {/* Header */}
      <div className="mb-12 pb-8 border-b border-[#D9CBB8]">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="label-caps text-[#B9694A] block mb-2">
              Buyer Shortlist
            </span>
            <h1 className="editorial-title text-4xl sm:text-5xl lg:text-6xl text-[#2B2E26]">
              Saved <em>Production</em> Styles
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-[#575C4E] max-w-md leading-relaxed font-montreal">
            Curate your seasonal line selections here before generating a formal Request for Quotation (RFQ).
          </p>
        </div>
      </div>

      {savedProducts.length === 0 ? (
        <div className="py-24 text-center border border-[#D9CBB8] bg-[#FAF6EF] p-10 space-y-5 max-w-xl mx-auto">
          <div className="w-14 h-14 border border-[#D9CBB8] bg-[#EAE0D0] mx-auto flex items-center justify-center text-[#B9694A]">
            <Heart className="w-7 h-7 stroke-[1.5]" />
          </div>
          <h3 className="font-header text-3xl text-[#2B2E26]">
            No Styles Saved Yet
          </h3>
          <p className="text-xs sm:text-sm text-[#575C4E] max-w-sm mx-auto leading-relaxed font-montreal">
            Click the heart icon on any style in our catalog to shortlist items for your brand or boutique review.
          </p>
          <div className="pt-3">
            <Link to="/collections" className="btn-terracotta text-xs py-3.5 px-8">
              Explore Collections
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          <div className="flex items-center justify-between text-xs sm:text-sm text-[#575C4E] font-montreal">
            <span>{savedProducts.length} Shortlisted Styles</span>
            <Link to="/collections" className="text-[#B9694A] hover:underline uppercase tracking-wider font-medium">
              + Browse More Styles
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 lg:gap-10">
            {savedProducts.map((product) => (
              <div
                key={product.id}
                className="group relative flex flex-col bg-[#FAF6EF] border border-[#D9CBB8] hover:border-[#2B2E26] transition-all"
              >
                {/* Image */}
                <div className="relative aspect-[3/4] bg-[#EAE0D0] overflow-hidden">
                  <Link to={`/product/${product.id}`} className="block w-full h-full">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                    />
                  </Link>

                  <div className="absolute top-3.5 left-3.5 bg-[#FAF6EF]/90 text-[#2B2E26] px-2.5 py-1 text-[0.625rem] tracking-wider uppercase font-medium border border-[#D9CBB8] font-montreal">
                    MOQ: {product.moq} {product.moqUnit}
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleSaveStyle(product.styleCode)}
                    className="absolute top-3.5 right-3.5 p-2 bg-[#B9694A] text-white border border-[#B9694A] hover:bg-[#A0573B] transition-colors"
                    title="Remove from saved"
                  >
                    <Trash2 className="w-4 h-4 stroke-[1.5]" />
                  </button>
                </div>

                {/* Details */}
                <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between">
                  <div>
                    <span className="label-caps text-[#B9694A] block mb-1.5">
                      {product.styleCode} • {product.categoryLabel}
                    </span>
                    <Link
                      to={`/product/${product.id}`}
                      className="font-header text-xl text-[#2B2E26] hover:text-[#B9694A] transition-colors line-clamp-1 block"
                    >
                      {product.name}
                    </Link>
                    <p className="text-xs sm:text-sm text-[#575C4E] mt-1 line-clamp-1 font-montreal">
                      {product.fabric}
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-[#D9CBB8]/60 space-y-3 font-montreal">
                    <div className="flex items-center justify-between">
                      <span className="text-[0.6875rem] uppercase text-[#575C4E]">Production Lead</span>
                      <span className="text-xs uppercase tracking-wider font-montreal font-medium text-[#2B2E26]">
                        {product.productionLeadTime}
                      </span>
                    </div>

                    <Link
                      to={`/product/${product.id}`}
                      className="btn-terracotta w-full py-2.5 text-xs flex items-center justify-center gap-1.5"
                    >
                      <span>View Product Details →</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
