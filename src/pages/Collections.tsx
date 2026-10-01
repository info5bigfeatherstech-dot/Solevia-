import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, SlidersHorizontal, Grid3X3, LayoutGrid, X, Check } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { apiService } from '../services/apiService';
import { Product, FilterState } from '../types';

export const Collections: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [gridCols, setGridCols] = useState<2 | 3 | 4>(3);

  // Filter States
  const categoryParam = searchParams.get('category') || 'all';
  const fabricParam = searchParams.get('fabric') || 'all';
  const seasonParam = searchParams.get('season') || 'all';
  const colorParam = searchParams.get('color') || 'all';
  const sortParam = (searchParams.get('sort') as FilterState['sortBy']) || 'featured';
  const moqParam = parseInt(searchParams.get('moq') || '0', 10);

  // Available options
  const categories = [
    { id: 'all', label: 'All Categories' },
    { id: 'swimwear', label: 'Swimwear & Bikinis' },
    { id: 'dresses', label: 'Ladies Dresses' },
    { id: 'boutique', label: 'Boutique Apparel' },
  ];

  const fabrics = [
    'All Fabrics',
    'Linen',
    'Ribbed Eco-Nylon',
    'Cotton Poplin',
    'Cotton Silk',
    'Crochet Knit',
    'Viscose Rayon',
    'Double Gauze',
  ];

  const seasons = [
    'All Seasons',
    'Resort 2026',
    'Spring/Summer 2026',
    'High Summer 2026',
  ];

  const colors = [
    { label: 'All Colors', hex: 'transparent' },
    { label: 'Terracotta', hex: '#B9694A' },
    { label: 'Olive', hex: '#2B2E26' },
    { label: 'Sand', hex: '#EAE0D0' },
    { label: 'Sea-glass', hex: '#A9BFB1' },
    { label: 'Ivory', hex: '#FAF6EF' },
  ];

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const res = await apiService.getProducts({
        category: categoryParam,
        fabric: fabricParam === 'All Fabrics' ? 'all' : fabricParam,
        season: seasonParam === 'All Seasons' ? 'all' : seasonParam,
        color: colorParam === 'All Colors' ? 'all' : colorParam,
        moqMax: moqParam,
        sortBy: sortParam,
      });
      setProducts(res);
      setLoading(false);
    };
    loadData();
  }, [categoryParam, fabricParam, seasonParam, colorParam, sortParam, moqParam]);

  const updateParam = (key: string, value: string) => {
    const updated = new URLSearchParams(searchParams);
    if (!value || value === 'all' || value === 'All Fabrics' || value === 'All Seasons' || value === 'All Colors' || value === '0') {
      updated.delete(key);
    } else {
      updated.set(key, value);
    }
    setSearchParams(updated);
  };

  const clearAllFilters = () => {
    setSearchParams(new URLSearchParams());
  };

  const hasActiveFilters =
    categoryParam !== 'all' ||
    fabricParam !== 'all' ||
    seasonParam !== 'all' ||
    colorParam !== 'all' ||
    moqParam > 0;

  return (
    <div className="editorial-container min-h-screen py-14 sm:py-20 lg:py-24">
      {/* Header Banner */}
      <div className="mb-12 pb-8 border-b border-[#D9CBB8]">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="label-caps text-[#B9694A] block mb-2">
              Wholesale Line Catalog
            </span>
            <h1 className="editorial-title text-4xl sm:text-5xl lg:text-6xl text-[#2B2E26]">
              All Production <em>Collections</em>
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-[#575C4E] max-w-md leading-relaxed font-montreal">
            Direct-from-factory styles available for wholesale production and private label branding. Enforcing baseline MOQ of 300 pieces per style.
          </p>
        </div>
      </div>

      {/* Control Bar: Filter toggle on mobile, Sort, Grid toggle */}
      <div className="flex flex-wrap items-center justify-between gap-4 py-5 px-6 mb-12 border-y border-[#D9CBB8] bg-[#EAE0D0]/30">
        <div className="flex items-center gap-4">
          {/* Mobile Filter Button */}
          <button
            type="button"
            onClick={() => setIsMobileFilterOpen(true)}
            className="lg:hidden btn-outline py-2 px-3 text-xs flex items-center gap-1.5"
          >
            <Filter className="w-3.5 h-3.5" />
            <span>Filters {hasActiveFilters && '(Active)'}</span>
          </button>

          <span className="text-xs text-[#575C4E] font-montreal">
            Showing <strong className="text-[#2B2E26] font-semibold">{products.length}</strong> styles
          </span>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={clearAllFilters}
              className="text-xs text-[#B9694A] hover:underline uppercase tracking-wider font-medium hidden sm:inline font-montreal"
            >
              Reset Filters
            </button>
          )}
        </div>

        <div className="flex items-center gap-4 ml-auto">
          {/* Sort dropdown */}
          <div className="flex items-center gap-2">
            <label className="text-xs uppercase tracking-wider text-[#575C4E] hidden sm:inline font-montreal">
              Sort:
            </label>
            <select
              value={sortParam}
              onChange={(e) => updateParam('sort', e.target.value)}
              className="text-xs py-2 px-3 bg-white border border-[#D9CBB8] text-[#2B2E26] focus:outline-none focus:border-[#B9694A] font-montreal"
            >
              <option value="featured">Featured First</option>
              <option value="moq-asc">MOQ: Low to High</option>
              <option value="name-asc">Alphabetical (A - Z)</option>
            </select>
          </div>

          {/* Grid Layout Toggles (Desktop) */}
          <div className="hidden md:flex items-center border border-[#D9CBB8] bg-white">
            <button
              type="button"
              onClick={() => setGridCols(2)}
              className={`p-2 ${gridCols === 2 ? 'bg-[#2B2E26] text-[#FAF6EF]' : 'text-[#575C4E] hover:text-[#2B2E26]'}`}
              title="2 Columns"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setGridCols(3)}
              className={`p-2 ${gridCols === 3 ? 'bg-[#2B2E26] text-[#FAF6EF]' : 'text-[#575C4E] hover:text-[#2B2E26]'}`}
              title="3 Columns"
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setGridCols(4)}
              className={`p-2 ${gridCols === 4 ? 'bg-[#2B2E26] text-[#FAF6EF]' : 'text-[#575C4E] hover:text-[#2B2E26]'}`}
              title="4 Columns"
            >
              <span className="font-mono text-xs px-1 font-bold">4</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Catalog Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Desktop Sidebar Filters */}
        <aside className="hidden lg:block lg:col-span-3 space-y-10 pr-8 border-r border-[#D9CBB8]">
          {/* Filter: Category */}
          <div className="space-y-3">
            <h4 className="label-caps text-[#2B2E26] border-b border-[#D9CBB8] pb-2">
              Category
            </h4>
            <div className="space-y-1.5 text-xs font-montreal">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => updateParam('category', cat.id)}
                  className={`w-full text-left py-2 px-3 transition-colors flex items-center justify-between ${
                    categoryParam === cat.id
                      ? 'bg-[#2B2E26] text-[#FAF6EF] font-medium'
                      : 'text-[#575C4E] hover:bg-[#EAE0D0]/50'
                  }`}
                >
                  <span>{cat.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Filter: Fabric */}
          <div className="space-y-3">
            <h4 className="label-caps text-[#2B2E26] border-b border-[#D9CBB8] pb-2">
              Fabrication
            </h4>
            <div className="space-y-1 text-xs font-montreal">
              {fabrics.map((f) => {
                const isSelected = fabricParam === f || (f === 'All Fabrics' && fabricParam === 'all');
                return (
                  <button
                    key={f}
                    type="button"
                    onClick={() => updateParam('fabric', f)}
                    className={`w-full text-left py-2 px-3 flex items-center justify-between transition-colors ${
                      isSelected
                        ? 'text-[#B9694A] font-semibold bg-[#EAE0D0]/50'
                        : 'text-[#575C4E] hover:text-[#2B2E26]'
                    }`}
                  >
                    <span>{f}</span>
                    {isSelected && <Check className="w-3.5 h-3.5" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Filter: Season */}
          <div className="space-y-3">
            <h4 className="label-caps text-[#2B2E26] border-b border-[#D9CBB8] pb-2">
              Season
            </h4>
            <div className="space-y-1 text-xs font-montreal">
              {seasons.map((s) => {
                const isSelected = seasonParam === s || (s === 'All Seasons' && seasonParam === 'all');
                return (
                  <button
                    key={s}
                    type="button"
                    onClick={() => updateParam('season', s)}
                    className={`w-full text-left py-2 px-3 flex items-center justify-between transition-colors ${
                      isSelected
                        ? 'text-[#B9694A] font-semibold bg-[#EAE0D0]/50'
                        : 'text-[#575C4E] hover:text-[#2B2E26]'
                    }`}
                  >
                    <span>{s}</span>
                    {isSelected && <Check className="w-3.5 h-3.5" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Filter: Color Palette */}
          <div className="space-y-3">
            <h4 className="label-caps text-[#2B2E26] border-b border-[#D9CBB8] pb-2">
              Color Story
            </h4>
            <div className="flex flex-wrap gap-2.5">
              {colors.map((c) => {
                const isSelected = colorParam === c.label || (c.label === 'All Colors' && colorParam === 'all');
                return (
                  <button
                    key={c.label}
                    type="button"
                    onClick={() => updateParam('color', c.label)}
                    className={`text-xs px-3 py-1.5 border flex items-center gap-1.5 transition-colors font-montreal ${
                      isSelected
                        ? 'border-[#2B2E26] bg-[#2B2E26] text-[#FAF6EF]'
                        : 'border-[#D9CBB8] bg-white text-[#575C4E] hover:border-[#2B2E26]'
                    }`}
                  >
                    {c.hex !== 'transparent' && (
                      <span
                        className="w-2.5 h-2.5 rounded-none border border-black/20 shrink-0"
                        style={{ backgroundColor: c.hex }}
                      />
                    )}
                    <span>{c.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Wholesale Notice */}
          <div className="p-6 bg-[#EAE0D0]/40 border border-[#D9CBB8] text-xs text-[#575C4E] space-y-2.5 font-montreal">
            <span className="label-caps text-[#B9694A] block">
              Direct Sourcing Note
            </span>
            <p className="leading-relaxed">
              Need custom Pantone shades or bespoke tech pack development? All 30 styles can be modified with your brand tags, altered dimensions, and exclusive print yardages.
            </p>
          </div>
        </aside>

        {/* Product Grid Area */}
        <main className="lg:col-span-9">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse bg-[#EAE0D0] aspect-[3/4] border border-[#D9CBB8]" />
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="py-24 text-center border border-[#D9CBB8] bg-[#FAF6EF] p-10 space-y-4">
              <h3 className="font-header text-3xl text-[#2B2E26]">No styles match your filters</h3>
              <p className="text-xs sm:text-sm text-[#575C4E] max-w-sm mx-auto font-montreal">
                Try resetting your fabric or season filters to view our complete wholesale collection.
              </p>
              <button
                type="button"
                onClick={clearAllFilters}
                className="btn-terracotta text-xs mt-4"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div
              className={`grid gap-6 ${
                gridCols === 2
                  ? 'grid-cols-1 sm:grid-cols-2'
                  : gridCols === 4
                  ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4'
                  : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
              }`}
            >
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  aspectRatio="square"
                />
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Mobile Filter Bottom Sheet / Modal */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-[#2B2E26]/60 backdrop-blur-xs"
            onClick={() => setIsMobileFilterOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-[#FAF6EF] p-6 border-l border-[#D9CBB8] overflow-y-auto space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#D9CBB8]">
              <span className="font-serif text-xl text-[#2B2E26]">Filter Catalog</span>
              <button
                type="button"
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-1 text-[#2B2E26]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Category */}
            <div>
              <span className="label-caps text-[#B9694A] block mb-2">Category</span>
              <div className="space-y-1 text-xs">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => {
                      updateParam('category', cat.id);
                      setIsMobileFilterOpen(false);
                    }}
                    className={`block w-full text-left py-1.5 px-2 ${
                      categoryParam === cat.id ? 'bg-[#2B2E26] text-white' : 'text-[#575C4E]'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Clear button */}
            <div className="pt-6 border-t border-[#D9CBB8] space-y-2">
              <button
                type="button"
                onClick={() => {
                  clearAllFilters();
                  setIsMobileFilterOpen(false);
                }}
                className="btn-outline w-full py-2.5 text-xs text-center justify-center"
              >
                Reset All Filters
              </button>
              <button
                type="button"
                onClick={() => setIsMobileFilterOpen(false)}
                className="btn-terracotta w-full py-2.5 text-xs text-center justify-center"
              >
                View {products.length} Results
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
