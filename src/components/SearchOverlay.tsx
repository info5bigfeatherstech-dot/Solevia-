import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ArrowRight, Tag } from 'lucide-react';
import { useStore } from '../store/useStore';
import { apiService } from '../services/apiService';
import { Product } from '../types';

export const SearchOverlay: React.FC = () => {
  const { isSearchOpen, setSearchOpen, addToInquiry } = useStore();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
      setResults([]);
    }
  }, [isSearchOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isSearchOpen) {
        setSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setSearchOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const timer = setTimeout(async () => {
      setIsLoading(true);
      const res = await apiService.searchStyles(query);
      setResults(res);
      setIsLoading(false);
    }, 150);

    return () => clearTimeout(timer);
  }, [query]);

  if (!isSearchOpen) return null;

  const handleSelectStyle = (productId: string) => {
    setSearchOpen(false);
    navigate(`/product/${productId}`);
  };

  const sampleSearches = [
    { label: 'European Linen Maxi', q: 'Linen' },
    { label: 'Ribbed Swimwear', q: 'Ribbed' },
    { label: 'Resort Co-Ord Sets', q: 'Co-Ord' },
    { label: 'Style SOL-SW-001', q: 'SOL-SW-001' },
    { label: 'Hand Crochet', q: 'Crochet' },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#2B2E26]/60 backdrop-blur-xs transition-opacity"
        onClick={() => setSearchOpen(false)}
      />

      <div className="relative min-h-screen px-4 pt-16 pb-20 flex justify-center items-start sm:pt-24">
        <div className="relative w-full max-w-3xl bg-[#FAF6EF] border border-[#D9CBB8] shadow-2xl p-8 sm:p-10 md:p-12">
          {/* Close button */}
          <button
            type="button"
            onClick={() => setSearchOpen(false)}
            className="absolute top-8 right-8 p-2 text-[#575C4E] hover:text-[#2B2E26]"
            aria-label="Close search"
          >
            <X className="w-5 h-5 stroke-[1.5]" />
          </button>

          {/* Search Input Bar */}
          <div className="flex items-center gap-4 border-b-2 border-[#2B2E26] pb-4 mb-8">
            <Search className="w-6 h-6 text-[#B9694A] stroke-[1.5]" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by Style Code (e.g. SOL-LD-001), Fabric, or Name..."
              className="w-full bg-transparent text-lg md:text-xl font-header text-[#2B2E26] placeholder-[#575C4E]/60 focus:outline-none"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="text-xs uppercase font-montreal tracking-wider text-[#575C4E] hover:text-[#2B2E26]"
              >
                Clear
              </button>
            )}
          </div>

          {/* Popular searches suggestions */}
          {!query && (
            <div className="space-y-4">
              <span className="label-caps font-montreal text-[#575C4E] block">
                Popular Wholesale Searches:
              </span>
              <div className="flex flex-wrap gap-2.5">
                {sampleSearches.map((item) => (
                  <button
                    key={item.q}
                    type="button"
                    onClick={() => setQuery(item.q)}
                    className="text-xs font-montreal px-3.5 py-2 bg-[#EAE0D0] hover:bg-[#D9CBB8] text-[#2B2E26] transition-colors border border-[#D9CBB8] flex items-center gap-2"
                  >
                    <Tag className="w-3.5 h-3.5 text-[#B9694A]" />
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Loading indicator */}
          {isLoading && (
            <div className="py-10 text-center text-xs font-montreal uppercase tracking-wider text-[#575C4E]">
              Searching catalog...
            </div>
          )}

          {/* Results list */}
          {query && !isLoading && results.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs font-montreal text-[#575C4E] pb-3 border-b border-[#D9CBB8]">
                <span>Found {results.length} wholesale styles</span>
                <span className="uppercase tracking-wider text-[0.625rem]">Production Ready</span>
              </div>

              <div className="max-h-[50vh] overflow-y-auto space-y-3 pr-2">
                {results.map((product) => (
                  <div
                    key={product.id}
                    className="group flex items-center justify-between p-4 border border-transparent hover:border-[#D9CBB8] hover:bg-[#EAE0D0]/40 transition-all cursor-pointer"
                    onClick={() => handleSelectStyle(product.id)}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-20 bg-[#EAE0D0] overflow-hidden shrink-0 border border-[#D9CBB8]">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <div>
                        <span className="label-caps font-montreal text-[#B9694A] block">
                          {product.styleCode} • {product.categoryLabel}
                        </span>
                        <h4 className="font-header text-lg text-[#2B2E26] group-hover:text-[#B9694A] transition-colors">
                          {product.name}
                        </h4>
                        <div className="text-xs font-montreal text-[#575C4E] mt-1">
                          {product.fabric} • MOQ: {product.moq} {product.moqUnit}
                        </div>
                      </div>
                    </div>

                    <div className="text-right pl-4">
                      <div className="text-xs uppercase tracking-wider font-montreal font-medium text-[#575C4E]">
                        Lead: {product.productionLeadTime}
                      </div>
                      <div className="text-[0.6875rem] font-montreal text-[#B9694A] flex items-center justify-end gap-1.5 mt-1.5 font-medium group-hover:translate-x-1 transition-transform">
                        <span>View Details</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* No results */}
          {query && !isLoading && results.length === 0 && (
            <div className="py-14 text-center space-y-3">
              <p className="font-header text-xl text-[#2B2E26]">
                No styles found matching "{query}"
              </p>
              <p className="text-sm font-montreal text-[#575C4E] max-w-sm mx-auto leading-relaxed">
                Looking for a custom design or custom fabric? Contact our OEM team directly with your tech packs.
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setSearchOpen(false);
                    navigate('/private-label');
                  }}
                  className="btn-outline text-xs font-montreal tracking-wider uppercase py-3 px-6"
                >
                  Inquire Custom OEM Manufacturing
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
