import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  aspectRatio?: 'portrait' | 'landscape' | 'square';
  showQuickAdd?: boolean;
  showPrice?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  aspectRatio = 'square',
  showQuickAdd = true,
  showPrice = false,
}) => {
  const navigate = useNavigate();

  const aspectClass =
    aspectRatio === 'landscape'
      ? 'aspect-[4/3]'
      : aspectRatio === 'portrait'
      ? 'aspect-[4/4.8]'
      : 'aspect-square';

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className="group relative flex flex-col bg-[#FAF6EF] border border-[#D9CBB8] transition-all duration-300 hover:border-[#2B2E26] cursor-pointer"
    >
      {/* Image container */}
      <div className={`relative w-full ${aspectClass} overflow-hidden bg-[#EAE0D0]`}>
        <img
          src={product.images[0]}
          alt={`${product.name} - ${product.styleCode} wholesale apparel`}
          className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700 ease-out"
          loading="lazy"
        />

        {/* MOQ Tag Badge */}
        <div className="absolute top-3 left-3 bg-[#FAF6EF]/90 backdrop-blur-xs text-[#2B2E26] px-2 py-0.5 text-[0.625rem] tracking-wider uppercase font-medium border border-[#D9CBB8]">
          MOQ: {product.moq} {product.moqUnit}
        </div>


        {/* View Details Hover Button */}
        {showQuickAdd && (
          <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
            <div className="btn-terracotta w-full py-2 text-[0.6875rem] shadow-none flex items-center justify-center gap-1.5">
              <span>View Product Details</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        )}
      </div>

      {/* Info Body */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between bg-[#FAF6EF]">
        <div>
          {/* Style Code & Category */}
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <span className="label-caps text-[#B9694A] font-semibold mb-0">
              {product.styleCode}
            </span>
            <span className="text-[0.625rem] text-[#575C4E] uppercase tracking-wider font-montreal">
              {product.subcategory}
            </span>
          </div>

          {/* Product Name */}
          <Link
            to={`/product/${product.id}`}
            onClick={(e) => e.stopPropagation()}
            className="font-header text-base sm:text-lg text-[#2B2E26] hover:text-[#B9694A] transition-colors leading-snug line-clamp-1 block mb-1"
          >
            {product.name}
          </Link>

          {/* Fabric info */}
          <p className="text-xs text-[#575C4E] line-clamp-1 font-light leading-relaxed">
            {product.fabric}
          </p>
        </div>

        {/* Pricing & Swatches Row */}
        <div className="mt-3.5 pt-3 border-t border-[#D9CBB8]/60 flex items-center justify-between">
          <div>
            <span className="text-[0.625rem] uppercase tracking-wider text-[#575C4E] block mb-0.5 font-montreal">
              Production Lead
            </span>
            <span className="text-xs uppercase tracking-wider font-montreal font-medium text-[#2B2E26]">
              {product.productionLeadTime}
            </span>
          </div>

          {/* Color swatch dots */}
          <div className="flex items-center gap-1.5" title={`${product.colors.length} factory colorways available`}>
            {product.colors.slice(0, 4).map((c) => (
              <span
                key={c.name}
                className="w-3 h-3 rounded-none border border-[#2B2E26]/20 inline-block"
                style={{ backgroundColor: c.hex }}
                title={c.name}
              />
            ))}
            {product.colors.length > 4 && (
              <span className="text-[0.625rem] text-[#575C4E] font-medium ml-0.5">
                +{product.colors.length - 4}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
