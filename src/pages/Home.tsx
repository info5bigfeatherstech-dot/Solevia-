import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Plus,
  ChevronDown,
  Layers,
  Sparkles,
} from 'lucide-react';
import { PRODUCTS, CATEGORIES_CONFIG } from '../data/products';
import { ProductCard } from '../components/ProductCard';

export const Home: React.FC = () => {
  // Testimonials state
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // FAQ state
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Lookbook Hotspot state
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);

  // Featured styles (8 selected)
  const featuredStyles = PRODUCTS.filter((p) => p.isFeatured).slice(0, 8);

  const testimonials = [
    {
      quote:
        'Solevia Exports transformed our summer delivery cycle. Their linen dresses and ribbed swimwear achieved a 98.4% on-spec rate on our initial 4,500-unit bulk consignment into Le Havre. Their fabric consistency matches top European fashion houses.',
      buyer: 'Éléonore Moreau',
      role: 'Head of Sourcing & Merchandising',
      company: 'Maison Mer Boutiques (14 Locations, France)',
      country: 'France',
    },
    {
      quote:
        'For an Australian resort brand, hitting strict delivery dates before our peak November retail season is paramount. Solevia dispatched our bespoke co-ord order 4 days ahead of schedule, with immaculate barcoding and custom organic hangtags.',
      buyer: 'Lachlan Vance',
      role: 'Managing Director & Founder',
      company: 'Byron Bay Coastal Wear',
      country: 'Australia',
    },
    {
      quote:
        'Their 300-piece MOQ per style allowed us to test two brand new bikini silhouettes with zero excess inventory liability. Both styles sold through 90% in 6 weeks. We are now ordering 2,000 units per style for next season.',
      buyer: 'Sarah Jenkins',
      role: 'Senior Apparel Buyer',
      company: 'Solstice Collective (California, USA)',
      country: 'United States',
    },
  ];

  const faqs = [
    {
      q: 'What is your Minimum Order Quantity (MOQ) structure?',
      a: 'Our baseline MOQ is 300 pieces (or sets for swimwear / co-ords) per style. This can be split across standard retail size gradings (typically XS through XL or customized size distributions). For custom Pantone yarn-dyeing, 500 pcs per colorway may apply.',
    },
    {
      q: 'How does your sample development process work?',
      a: 'We produce pre-production samples (PPS) in 5 to 7 business days from tech pack approval. Sample development charges are 100% credited against your final bulk production commercial invoice.',
    },
    {
      q: 'What wholesale payment terms do you offer international buyers?',
      a: 'For first-time international buyers, our standard terms are 30% advance deposit via Telegraphic Transfer (T/T) upon order confirmation, and 70% balance prior to bill of lading release or via Irrevocable Letter of Credit (L/C at sight) for high-volume export contracts.',
    },
    {
      q: 'Which Incoterms do you export under?',
      a: 'We predominantly ship FOB (Nhava Sheva / Mumbai or Mundra Port). However, we routinely execute CIF, CFR, EXW, and door-to-door DDP shipments for select boutique clients using our contracted global freight forwarders (Maersk, MSC, DHL Global Forwarding).',
    },
    {
      q: 'Can you manufacture custom private label branding and trims?',
      a: 'Yes, 100% of our production supports bespoke OEM/ODM private labeling. We produce custom woven neck labels, recycled FSC hangtags, branded metal hardware (gold, matte black, engraved zinc), custom polybags, and custom barcode labels.',
    },
  ];

  const hotspots = [
    {
      id: 1,
      top: '32%',
      left: '42%',
      styleCode: 'SOL-LD-001',
      name: 'Aurelia Tiered European Linen Maxi',
      price: 'Upon Request',
      moq: '300 pcs',
      link: '/product/sol-ld-001',
    },
    {
      id: 2,
      top: '64%',
      left: '58%',
      styleCode: 'SOL-BA-001',
      name: 'Mallorca Linen Relaxed Co-Ord Set',
      price: 'Upon Request',
      moq: '300 sets',
      link: '/product/sol-ba-001',
    },
    {
      id: 3,
      top: '40%',
      left: '78%',
      styleCode: 'SOL-SW-001',
      name: 'Paloma Ribbed Underwire Bikini',
      price: 'Upon Request',
      moq: '300 sets',
      link: '/product/sol-sw-001',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[92vh] flex items-center justify-center bg-[#2B2E26] overflow-hidden">
        {/* Background Image with gentle editorial darken */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=2000&q=85"
            alt="Solevia Exports Resort Collection Campaign"
            className="w-full h-full object-cover object-center opacity-45 brightness-90 filter"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2B2E26] via-transparent to-[#2B2E26]/60" />
        </div>

        {/* Content */}
        <div className="relative max-w-5xl mx-auto px-6 sm:px-10 lg:px-12 text-center text-[#FAF6EF] py-32 sm:py-40 md:py-48">
          <span className="label-caps text-[#A9BFB1] tracking-[0.25em] mb-5 inline-block font-semibold">
            Manufacturer &amp; Wholesale Exporter
          </span>

          <h1 className="editorial-title text-4xl sm:text-2xl md:text-3xl lg:text-6xl font-light text-[#FAF6EF] mb-8 leading-[1.04]">
            Women’s Apparel, <em>Crafted</em> for Global Buyers.
          </h1>

          <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-[#EAE0D0] font-light leading-relaxed mb-12">
            Supplying international fashion boutiques, department stores, and independent resort brands with certified linen dresses, engineered swimwear, and capsule apparel. Minimum order quantity from 300 pieces.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <Link
              to="/contact"
              className="btn-terracotta py-4 px-9 text-xs tracking-[0.16em] w-full sm:w-auto"
            >
              <span>Request a Quote</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/collections"
              className="border border-[#FAF6EF]/60 hover:border-[#FAF6EF] text-[#FAF6EF] hover:bg-[#FAF6EF] hover:text-[#2B2E26] py-4 px-9 text-xs uppercase tracking-[0.16em] font-medium transition-all duration-200 w-full sm:w-auto text-center"
            >
              View Collections (30 Styles)
            </Link>
          </div>

          <div className="mt-16 pt-10 border-t border-[#FAF6EF]/15 flex flex-wrap items-center justify-center gap-8 sm:gap-14 text-[0.6875rem] uppercase tracking-widest text-[#D9CBB8]">
            <span>• Direct Factory Export</span>
            <span>• AQL 2.5 Inspection</span>
            <span>• Private Label Packaging</span>
            <span>• Sea &amp; Air Freight</span>
          </div>
        </div>
      </section>

      {/* 2. SLOW MARQUEE */}
      <div className="bg-[#EAE0D0] border-y border-[#D9CBB8] py-4 overflow-hidden select-none">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...Array(4)].map((_, idx) => (
            <div
              key={idx}
              className="flex items-center space-x-10 text-xs sm:text-sm uppercase tracking-[0.2em] text-[#2B2E26] font-medium px-6 font-montreal"
            >
              <span>Swimwear &amp; Bikinis</span>
              <span className="text-[#B9694A]">—</span>
              <span>Ladies Dresses</span>
              <span className="text-[#B9694A]">—</span>
              <span>Boutique Apparel</span>
              <span className="text-[#B9694A]">—</span>
              <span>Private Label OEM</span>
              <span className="text-[#B9694A]">—</span>
              <span>Made for Global Buyers</span>
              <span className="text-[#B9694A]">—</span>
            </div>
          ))}
        </div>
      </div>

      {/* 3. TRUST STRIP */}
      <section className="bg-[#FAF6EF] border-b border-[#D9CBB8] py-14 sm:py-18 px-6 sm:px-10 lg:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 text-center divide-y md:divide-y-0 md:divide-x divide-[#D9CBB8]">
          <div className="pt-6 md:pt-0">
            <span className="font-header text-3xl sm:text-4xl lg:text-5xl text-[#2B2E26] block font-light">
              18+
            </span>
            <span className="label-caps text-[#575C4E] mt-2 block mb-0">
              Years Export Heritage
            </span>
          </div>

          <div className="pt-6 md:pt-0">
            <span className="font-header text-3xl sm:text-4xl lg:text-5xl text-[#2B2E26] block font-light">
              26
            </span>
            <span className="label-caps text-[#575C4E] mt-2 block mb-0">
              Export Destination Countries
            </span>
          </div>

          <div className="pt-6 md:pt-0">
            <span className="font-header text-3xl sm:text-4xl lg:text-5xl text-[#2B2E26] block font-light">
              120,000+
            </span>
            <span className="label-caps text-[#575C4E] mt-2 block mb-0">
              Monthly Garment Capacity
            </span>
          </div>

          <div className="pt-6 md:pt-0">
            <span className="font-header text-3xl sm:text-4xl lg:text-5xl text-[#2B2E26] block font-light">
              98.6%
            </span>
            <span className="label-caps text-[#575C4E] mt-2 block mb-0">
              On-Time Dispatch Rate
            </span>
          </div>
        </div>
      </section>

      {/* 4. THREE CATEGORY TILES (Asymmetric Editorial Grid) */}
      <section className="py-24 sm:py-32 lg:py-36 px-6 sm:px-10 lg:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-[#D9CBB8] pb-8">
          <div className="max-w-2xl">
            <span className="label-caps font-montreal text-[#B9694A] block mb-2">
              Manufacturing Categories
            </span>
            <h2 className="font-header text-3xl sm:text-4xl lg:text-5xl text-[#2B2E26] tracking-tight">
              Engineered for <span className="font-serif italic font-normal">Wholesale</span> Excellence
            </h2>
            <p className="font-montreal text-sm sm:text-base text-[#575C4E] mt-3 leading-relaxed">
              From quick-turnaround bikini sets to pure European flax linen maxi dresses and pre-matched resort co-ords. Each line backed by full technical specifications.
            </p>
          </div>
          <div className="shrink-0 pb-1">
            <Link
              to="/collections"
              className="text-xs font-montreal uppercase tracking-widest text-[#B9694A] hover:underline font-semibold flex items-center gap-1.5"
            >
              <span>View All Categories</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Asymmetric 3-Tile Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Tile 1: Swimwear (Span 5) */}
          <Link
            to="/category/swimwear"
            className="group lg:col-span-5 relative flex flex-col justify-between bg-[#EAE0D0] border border-[#D9CBB8] overflow-hidden min-h-[480px] p-8 transition-all hover:border-[#2B2E26]"
          >
            <div className="absolute inset-0 z-0">
              <img
                src={CATEGORIES_CONFIG[0].image}
                alt="Wholesale Swimwear Manufacturer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out brightness-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2B2E26]/90 via-[#2B2E26]/30 to-transparent" />
            </div>

            <div className="relative z-10 flex items-center justify-between">
              <span className="bg-[#FAF6EF]/90 text-[#2B2E26] px-2.5 py-1 text-[0.625rem] tracking-wider uppercase font-medium">
                10 Styles In Production
              </span>
              <span className="text-[#FAF6EF] text-xs uppercase tracking-wider font-light">
                MOQ: {CATEGORIES_CONFIG[0].moq}
              </span>
            </div>

            <div className="relative z-10 text-[#FAF6EF] mt-auto">
              <span className="label-caps text-[#A9BFB1] block mb-1">
                Category 01
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl text-[#FAF6EF] mb-2">
                Swimwear &amp; Bikinis
              </h3>
              <p className="text-xs text-[#EAE0D0] line-clamp-2 mb-4 font-light leading-relaxed">
                {CATEGORIES_CONFIG[0].description}
              </p>
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#FAF6EF] group-hover:text-[#A9BFB1] transition-colors font-medium">
                <span>Explore Swimwear Line ({CATEGORIES_CONFIG[0].moq})</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
              </div>
            </div>
          </Link>

          {/* Tile 2 & 3 Right Column (Span 7) */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            {/* Tile 2: Ladies Dresses */}
            <Link
              to="/category/dresses"
              className="group relative flex-1 flex flex-col justify-between bg-[#EAE0D0] border border-[#D9CBB8] overflow-hidden min-h-[260px] p-8 transition-all hover:border-[#2B2E26]"
            >
              <div className="absolute inset-0 z-0">
                <img
                  src={CATEGORIES_CONFIG[1].image}
                  alt="Wholesale Ladies Dresses"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2B2E26]/85 via-[#2B2E26]/30 to-transparent" />
              </div>

              <div className="relative z-10 flex items-center justify-between">
                <span className="bg-[#FAF6EF]/90 text-[#2B2E26] px-2.5 py-1 text-[0.625rem] tracking-wider uppercase font-medium">
                  10 Styles In Production
                </span>
                <span className="text-[#FAF6EF] text-xs uppercase tracking-wider font-light">
                  MOQ: {CATEGORIES_CONFIG[1].moq}
                </span>
              </div>

              <div className="relative z-10 text-[#FAF6EF] mt-auto">
                <span className="label-caps text-[#A9BFB1] block mb-1">
                  Category 02
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#FAF6EF] mb-1">
                  Ladies Dresses &amp; Linen Midis
                </h3>
                <p className="text-xs text-[#EAE0D0] line-clamp-1 mb-3 font-light">
                  {CATEGORIES_CONFIG[1].tagline}
                </p>
                <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#FAF6EF] group-hover:text-[#A9BFB1] transition-colors font-medium">
                  <span>View Dresses</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>
            </Link>

            {/* Tile 3: Boutique Apparel */}
            <Link
              to="/category/boutique"
              className="group relative flex-1 flex flex-col justify-between bg-[#EAE0D0] border border-[#D9CBB8] overflow-hidden min-h-[260px] p-8 transition-all hover:border-[#2B2E26]"
            >
              <div className="absolute inset-0 z-0">
                <img
                  src={CATEGORIES_CONFIG[2].image}
                  alt="Boutique Apparel Wholesale"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2B2E26]/85 via-[#2B2E26]/30 to-transparent" />
              </div>

              <div className="relative z-10 flex items-center justify-between">
                <span className="bg-[#FAF6EF]/90 text-[#2B2E26] px-2.5 py-1 text-[0.625rem] tracking-wider uppercase font-medium">
                  10 Styles In Production
                </span>
                <span className="text-[#FAF6EF] text-xs uppercase tracking-wider font-light">
                  MOQ: {CATEGORIES_CONFIG[2].moq}
                </span>
              </div>

              <div className="relative z-10 text-[#FAF6EF] mt-auto">
                <span className="label-caps text-[#A9BFB1] block mb-1">
                  Category 03
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#FAF6EF] mb-1">
                  Boutique Apparel &amp; Co-Ords
                </h3>
                <p className="text-xs text-[#EAE0D0] line-clamp-1 mb-3 font-light">
                  {CATEGORIES_CONFIG[2].tagline}
                </p>
                <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#FAF6EF] group-hover:text-[#A9BFB1] transition-colors font-medium">
                  <span>View Boutique Apparel</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 5. FEATURED STYLES CAROUSEL / GRID WITH MOQ & FOB INFO */}
      <section className="py-20 sm:py-28 bg-[#EAE0D0]/40 border-y border-[#D9CBB8]">
        <div className="max-w-[1520px] mx-auto px-6 sm:px-10 lg:px-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-6 border-b border-[#D9CBB8]">
            <div>
              <span className="label-caps text-[#B9694A] block mb-2">
                Curated Line Selection
              </span>
              <h2 className="editorial-title text-3xl sm:text-4xl lg:text-5xl text-[#2B2E26]">
                Featured <em>Production</em> Styles
              </h2>
            </div>
            <div className="mt-6 sm:mt-0 flex items-center gap-4">
              <Link
                to="/collections"
                className="sliding-link text-xs"
              >
                View Full Catalog (30 Styles) →
              </Link>
            </div>
          </div>

          {/* Grid of balanced, wider product cards with normal proportions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {featuredStyles.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                aspectRatio="square"
              />
            ))}
          </div>
        </div>
      </section>

      {/* 6. LARGE SPLIT FEATURE: SEASONAL COLLECTION WITH EDITORIAL TEXT */}
      <section className="py-28 sm:py-36 px-6 sm:px-10 lg:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-20 items-center">
          <div className="lg:col-span-6 relative">
            <div className="aspect-[3/4] bg-[#EAE0D0] overflow-hidden border border-[#D9CBB8]">
              <img
                src="https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=1200&q=80"
                alt="Solevia Resort 2026 Editorial"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            {/* Editorial overlay badge */}
            <div className="absolute -bottom-6 -right-6 hidden sm:block bg-[#2B2E26] text-[#FAF6EF] p-7 max-w-xs border border-[#3B3F34]">
              <span className="label-caps text-[#A9BFB1] block mb-2">
                Fabric Integrity
              </span>
              <p className="text-xs text-[#D9CBB8] leading-relaxed">
                100% pre-washed European Flax® linen certified to retain less than 1.5% residual shrinkage after industrial wash.
              </p>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-7 lg:pl-4">
            <span className="label-caps text-[#B9694A]">
              Editorial Focus • Resort 2026 Collection
            </span>

            <h2 className="editorial-title text-3xl sm:text-5xl text-[#2B2E26] leading-tight">
              Sun-Washed Silhouettes, <em>Tailored</em> for Global Coastlines.
            </h2>

            <p className="text-sm sm:text-base text-[#575C4E] leading-relaxed font-light">
              Designed for boutique owners and resort buyers seeking effortless Mediterranean sophistication. Our latest seasonal capsule blends airy 165 GSM certified flax linen with buttery regenerated ocean lycra.
            </p>

            <div className="space-y-3.5 pt-4 text-xs text-[#2B2E26] border-y border-[#D9CBB8] py-5">
              <div className="flex items-start justify-between">
                <span className="font-semibold uppercase tracking-wider text-[#575C4E] font-montreal">Standard Lead Time:</span>
                <span>30 - 40 Calendar Days Bulk</span>
              </div>
              <div className="flex items-start justify-between">
                <span className="font-semibold uppercase tracking-wider text-[#575C4E] font-montreal">Fabric Origins:</span>
                <span>Normandy Flax, Italian Carvico Rib, GOTS Cotton</span>
              </div>
              <div className="flex items-start justify-between">
                <span className="font-semibold uppercase tracking-wider text-[#575C4E] font-montreal">Packing:</span>
                <span>Individual Compostable Bags + Export Master Cartons</span>
              </div>
            </div>

            <div className="flex items-center gap-5 pt-3">
              <Link to="/category/dresses" className="btn-terracotta text-xs">
                Explore Dress Capsule
              </Link>
              <Link to="/download-catalog" className="sliding-link text-xs">
                Download Line Sheet (PDF)
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 7. "WHY BUYERS CHOOSE SOLEVIA": Quiet text columns, NO icons */}
      <section className="bg-[#FAF6EF] border-t border-[#D9CBB8] py-24 sm:py-32 px-6 sm:px-10 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 max-w-xl">
            <span className="label-caps text-[#B9694A] block mb-2">
              Credibility &amp; Operations
            </span>
            <h2 className="editorial-title text-3xl sm:text-4xl lg:text-5xl text-[#2B2E26]">
              Why International Buyers Choose Solevia
            </h2>
            <p className="text-xs sm:text-sm text-[#575C4E] mt-3 leading-relaxed">
              Quiet manufacturing rigor without middlemen, inflated markups, or communication barriers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-10 lg:gap-12 border-t border-[#D9CBB8] pt-12">
            {/* Col 1 */}
            <div className="space-y-2">
              <span className="text-[0.6875rem] font-mono text-[#B9694A] font-semibold">
                01 / DESIGN
              </span>
              <h4 className="font-serif text-xl text-[#2B2E26]">
                In-House Technical Design
              </h4>
              <p className="text-xs text-[#575C4E] leading-relaxed">
                Full pattern making, 3D digital sampling, and computerized marker planning to maximize fabric yield and lower unit costs.
              </p>
            </div>

            {/* Col 2 */}
            <div className="space-y-2">
              <span className="text-[0.6875rem] font-mono text-[#B9694A] font-semibold">
                02 / QUALITY
              </span>
              <h4 className="font-serif text-xl text-[#2B2E26]">
                Strict AQL 2.5 Quality Control
              </h4>
              <p className="text-xs text-[#575C4E] leading-relaxed">
                Four-tier in-line checks: raw fabric inspection, cutting audit, 100% mid-sewing check, and pre-shipment carton audits.
              </p>
            </div>

            {/* Col 3 */}
            <div className="space-y-2">
              <span className="text-[0.6875rem] font-mono text-[#B9694A] font-semibold">
                03 / MOQ
              </span>
              <h4 className="font-serif text-xl text-[#2B2E26]">
                Accessible 300-Pc Low MOQ
              </h4>
              <p className="text-xs text-[#575C4E] leading-relaxed">
                Allows boutiques and emerging designer labels to introduce fresh styles without tying up working capital in unsold inventory.
              </p>
            </div>

            {/* Col 4 */}
            <div className="space-y-2">
              <span className="text-[0.6875rem] font-mono text-[#B9694A] font-semibold">
                04 / BRANDING
              </span>
              <h4 className="font-serif text-xl text-[#2B2E26]">
                Full Private Label Packaging
              </h4>
              <p className="text-xs text-[#575C4E] leading-relaxed">
                Custom jacquard woven labels, heat transfers, engraved hardware, organic cotton dustbags, and destination-compliant barcodes.
              </p>
            </div>

            {/* Col 5 */}
            <div className="space-y-2">
              <span className="text-[0.6875rem] font-mono text-[#B9694A] font-semibold">
                05 / SHIPPING
              </span>
              <h4 className="font-serif text-xl text-[#2B2E26]">
                On-Time Global Dispatch
              </h4>
              <p className="text-xs text-[#575C4E] leading-relaxed">
                Direct export documentation handling, fumigation certificates, GSP certificates of origin, and transparent vessel tracking.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. MANUFACTURING PROCESS TIMELINE */}
      <section className="bg-[#2B2E26] text-[#FAF6EF] py-28 sm:py-36 px-6 sm:px-10 lg:px-12 border-y border-[#3B3F34]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 sm:mb-20 border-b border-[#3B3F34] pb-8">
            <div className="max-w-2xl">
              <span className="label-caps font-montreal text-[#A9BFB1] block mb-2">
                Standard Operating Procedure
              </span>
              <h2 className="font-header text-3xl sm:text-4xl lg:text-5xl text-[#FAF6EF] tracking-tight">
                The Manufacturing Timeline
              </h2>
              <p className="font-montreal text-sm sm:text-base text-[#D9CBB8] mt-3 leading-relaxed font-light">
                From sample dispatch to vessel loading, our transparent 6-step manufacturing workflow guarantees precision execution.
              </p>
            </div>
            <div className="shrink-0 pb-1">
              <Link
                to="/manufacturing"
                className="text-xs font-montreal uppercase tracking-widest text-[#A9BFB1] hover:text-[#FAF6EF] font-medium flex items-center gap-1.5 transition-colors"
              >
                <span>Full Facility Audit</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
            {[
              {
                step: '01',
                title: 'Design & Tech Pack',
                duration: 'Days 1 - 3',
                desc: 'Pattern digitization, grading verification, and Pantone color approval.',
              },
              {
                step: '02',
                title: 'Sampling (PPS)',
                duration: 'Days 4 - 10',
                desc: 'Pre-production prototype cut and sewn in exact sample room fabric.',
              },
              {
                step: '03',
                title: 'Fabric Dyeing & Mill',
                duration: 'Days 11 - 20',
                desc: 'Lab dips approval, fabric knit/weaving, pre-shrunk wash tests.',
              },
              {
                step: '04',
                title: 'Bulk Production',
                duration: 'Days 21 - 34',
                desc: 'Computerized laser cutting, assembly lines, and in-line inspections.',
              },
              {
                step: '05',
                title: 'QC & Packaging',
                duration: 'Days 35 - 38',
                desc: 'Final needle detector sweep, pressing, tagging, and master carton packing.',
              },
              {
                step: '06',
                title: 'Customs & Dispatch',
                duration: 'Days 39 - 42',
                desc: 'Port container stuffing, bill of lading issuance, sea or air freight transit.',
              },
            ].map((st) => (
              <div
                key={st.step}
                className="border-t border-[#A9BFB1]/30 pt-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs text-[#B9694A] font-semibold">
                      STEP {st.step}
                    </span>
                    <span className="text-[0.625rem] text-[#A9BFB1] uppercase tracking-wider font-montreal">
                      {st.duration}
                    </span>
                  </div>
                  <h4 className="font-header text-lg text-[#FAF6EF] mb-2 font-medium">
                    {st.title}
                  </h4>
                  <p className="text-xs text-[#D9CBB8]/80 leading-relaxed font-light">
                    {st.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 pt-10 border-t border-[#3B3F34] flex flex-col sm:flex-row items-center justify-between gap-6">
            <span className="text-xs sm:text-sm text-[#D9CBB8] font-light">
              Rush sampling and split delivery options available for seasonal resort collections.
            </span>
            <Link
              to="/manufacturing"
              className="text-xs uppercase tracking-widest text-[#A9BFB1] hover:text-[#FAF6EF] flex items-center gap-2 font-medium transition-colors"
            >
              <span>Explore Factory Floor &amp; Machinery</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 9. PRIVATE LABEL & CUSTOMIZATION SECTION */}
      <section className="py-28 sm:py-36 px-6 sm:px-10 lg:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-center">
          <div className="lg:col-span-6 space-y-7">
            <span className="label-caps text-[#B9694A]">
              OEM / ODM Capabilities
            </span>
            <h2 className="editorial-title text-3xl sm:text-5xl text-[#2B2E26]">
              Your Label, Our <em>Master Craftsmanship</em>.
            </h2>
            <p className="text-sm sm:text-base text-[#575C4E] leading-relaxed font-light">
              Whether you want to select styles directly from our curated wholesale line sheets or provide your proprietary CAD patterns and tech packs, our export house operates as an extension of your atelier.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-3">
              <div className="p-6 border border-[#D9CBB8] bg-[#FAF6EF]">
                <h5 className="font-header text-lg text-[#2B2E26] mb-2 font-medium">
                  Custom Branding &amp; Trims
                </h5>
                <p className="text-xs text-[#575C4E] leading-relaxed">
                  Damask woven neck labels, care instructions, barcoded hangtags, embossed cord ends, and FSC-certified packaging.
                </p>
              </div>

              <div className="p-6 border border-[#D9CBB8] bg-[#FAF6EF]">
                <h5 className="font-header text-lg text-[#2B2E26] mb-2 font-medium">
                  Bespoke Fabric Dyeing
                </h5>
                <p className="text-xs text-[#575C4E] leading-relaxed">
                  Exact Pantone matching with OEKO-TEX certified azo-free colorants across pure linen, organic cotton, and eco-lycra.
                </p>
              </div>

              <div className="p-6 border border-[#D9CBB8] bg-[#FAF6EF]">
                <h5 className="font-header text-lg text-[#2B2E26] mb-2 font-medium">
                  Custom Screen &amp; Digital Prints
                </h5>
                <p className="text-xs text-[#575C4E] leading-relaxed">
                  Exclusive rotary screen and high-definition reactive digital yardage prints with zero color bleed under chlorine wash.
                </p>
              </div>

              <div className="p-6 border border-[#D9CBB8] bg-[#FAF6EF]">
                <h5 className="font-header text-lg text-[#2B2E26] mb-2 font-medium">
                  Custom Size Grading
                </h5>
                <p className="text-xs text-[#575C4E] leading-relaxed">
                  Adaptations for European, US, or Australian retail sizing guidelines, petite, curvy, and extended dimension charts.
                </p>
              </div>
            </div>

            <div className="pt-3">
              <Link to="/private-label" className="btn-terracotta text-xs">
                Inquire Private Label Program
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="aspect-[4/3] bg-[#EAE0D0] overflow-hidden border border-[#D9CBB8]">
              <img
                src="https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1200&q=80"
                alt="Apparel Factory Quality Inspection and Trims"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 10. LOOKBOOK BANNER WITH SHOPPABLE HOTSPOTS */}
      <section className="py-24 sm:py-32 bg-[#EAE0D0]/50 border-y border-[#D9CBB8]">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
          <div className="text-center max-w-xl mx-auto mb-14">
            <span className="label-caps text-[#B9694A] block mb-2">
              Interactive Lookbook
            </span>
            <h2 className="editorial-title text-3xl sm:text-4xl lg:text-5xl text-[#2B2E26]">
              Explore Styles in <em>Editorial</em> Context
            </h2>
            <p className="text-xs sm:text-sm text-[#575C4E] mt-3">
              Click the interactive pins to preview technical specifications and FOB wholesale pricing.
            </p>
          </div>

          {/* Lookbook container */}
          <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] bg-[#2B2E26] overflow-hidden border border-[#D9CBB8]">
            <img
              src="https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=2000&q=80"
              alt="Interactive Wholesale Lookbook"
              className="w-full h-full object-cover brightness-95"
            />

            {/* Hotspots */}
            {hotspots.map((hs) => (
              <div
                key={hs.id}
                className="absolute"
                style={{ top: hs.top, left: hs.left }}
              >
                <button
                  type="button"
                  onClick={() =>
                    setActiveHotspot(activeHotspot === hs.id ? null : hs.id)
                  }
                  className="relative group flex items-center justify-center"
                  aria-label={`View style ${hs.styleCode}`}
                >
                  <span className="w-8 h-8 rounded-full bg-[#B9694A] text-[#FAF6EF] flex items-center justify-center border-2 border-white shadow-md animate-pulse">
                    <Plus className="w-4 h-4 stroke-[2.5]" />
                  </span>
                </button>

                {/* Hotspot Card Popover */}
                {activeHotspot === hs.id && (
                  <div className="absolute top-10 left-1/2 -translate-x-1/2 z-20 w-64 bg-[#FAF6EF] border border-[#D9CBB8] p-4 shadow-2xl text-left">
                    <span className="label-caps text-[#B9694A] block mb-1">
                      {hs.styleCode}
                    </span>
                    <h5 className="font-header text-sm font-medium text-[#2B2E26] line-clamp-1">
                      {hs.name}
                    </h5>
                    <div className="mt-3 pt-3 border-t border-[#D9CBB8] flex items-center justify-between text-xs">
                      <div>
                        <span className="text-[0.5625rem] text-[#575C4E] block uppercase">
                          Minimum Order
                        </span>
                        <span className="font-semibold text-[#2B2E26]">{hs.moq}</span>
                      </div>
                      <Link
                        to={hs.link}
                        className="btn-terracotta py-1.5 px-3 text-[0.625rem] shadow-none"
                      >
                        Specs →
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. CAPACITY AND CERTIFICATIONS STRIP */}
      <section className="bg-[#FAF6EF] py-20 sm:py-28 px-6 sm:px-10 lg:px-12 border-b border-[#D9CBB8]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="label-caps text-[#575C4E]">
              Audited Factory Standards &amp; Ethical Manufacturing
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
            <div className="p-7 sm:p-8 border border-[#D9CBB8] bg-[#EAE0D0]/30 text-center">
              <span className="font-header text-xl sm:text-2xl font-medium text-[#2B2E26] block">
                OEKO-TEX®
              </span>
              <span className="label-caps text-[#575C4E] mt-2 block mb-0">
                Standard 100 Class I &amp; II
              </span>
              <p className="text-[0.6875rem] text-[#575C4E] mt-3 font-light leading-relaxed">
                Zero harmful chemicals, heavy metals or prohibited AZO colorants.
              </p>
            </div>

            <div className="p-7 sm:p-8 border border-[#D9CBB8] bg-[#EAE0D0]/30 text-center">
              <span className="font-header text-xl sm:text-2xl font-medium text-[#2B2E26] block">
                GOTS Certified
              </span>
              <span className="label-caps text-[#575C4E] mt-2 block mb-0">
                Global Organic Textile
              </span>
              <p className="text-[0.6875rem] text-[#575C4E] mt-3 font-light leading-relaxed">
                Certified 100% organic cotton voile, poplin, and natural jersey.
              </p>
            </div>

            <div className="p-7 sm:p-8 border border-[#D9CBB8] bg-[#EAE0D0]/30 text-center">
              <span className="font-header text-xl sm:text-2xl font-medium text-[#2B2E26] block">
                SEDEX SMETA
              </span>
              <span className="label-caps text-[#575C4E] mt-2 block mb-0">
                4-Pillar Audited
              </span>
              <p className="text-[0.6875rem] text-[#575C4E] mt-3 font-light leading-relaxed">
                Fair living wages, safe working environment, zero child labor.
              </p>
            </div>

            <div className="p-7 sm:p-8 border border-[#D9CBB8] bg-[#EAE0D0]/30 text-center">
              <span className="font-header text-xl sm:text-2xl font-medium text-[#2B2E26] block">
                AQL 2.5 Major
              </span>
              <span className="label-caps text-[#575C4E] mt-2 block mb-0">
                ISO 2859-1 Sampling
              </span>
              <p className="text-[0.6875rem] text-[#575C4E] mt-3 font-light leading-relaxed">
                International standard statistical batch quality assurance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 12. EXPORT MARKETS (Clean list / grid) */}
      <section className="py-24 sm:py-32 px-6 sm:px-10 lg:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-18 items-center">
          <div className="lg:col-span-5">
            <span className="label-caps text-[#B9694A] block mb-2">
              Global Logistics
            </span>
            <h2 className="editorial-title text-3xl sm:text-4xl lg:text-5xl text-[#2B2E26]">
              Export Destinations &amp; Major Hubs
            </h2>
            <p className="text-xs sm:text-sm text-[#575C4E] mt-4 leading-relaxed font-light">
              We coordinate regular sea freight container dispatches and weekly air freight consolidations to primary customs ports worldwide with full commercial export documentation.
            </p>
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-5">
            {[
              {
                region: 'United States',
                ports: 'Los Angeles • New York • Miami',
                transit: 'Sea: 22-26d | Air: 4-6d',
              },
              {
                region: 'United Kingdom',
                ports: 'Southampton • Felixstowe • London LHR',
                transit: 'Sea: 18-22d | Air: 3-5d',
              },
              {
                region: 'European Union',
                ports: 'Rotterdam • Hamburg • Le Havre',
                transit: 'Sea: 20-24d | Air: 4-5d',
              },
              {
                region: 'Australia & NZ',
                ports: 'Sydney • Melbourne • Brisbane',
                transit: 'Sea: 16-20d | Air: 3-5d',
              },
              {
                region: 'United Arab Emirates',
                ports: 'Jebel Ali (Dubai) • DXB Air',
                transit: 'Sea: 4-6d | Air: 1-2d',
              },
              {
                region: 'Canada',
                ports: 'Vancouver • Montreal • Toronto',
                transit: 'Sea: 24-28d | Air: 5-7d',
              },
            ].map((mkt) => (
              <div
                key={mkt.region}
                className="p-5 border border-[#D9CBB8] bg-[#FAF6EF] flex flex-col justify-between"
              >
                <div>
                  <h5 className="font-header text-base font-medium text-[#2B2E26]">
                    {mkt.region}
                  </h5>
                  <p className="text-[0.6875rem] text-[#575C4E] mt-1.5 leading-snug">
                    {mkt.ports}
                  </p>
                </div>
                <span className="text-[0.625rem] text-[#B9694A] font-mono mt-4 pt-3 border-t border-[#D9CBB8]/60 font-medium">
                  {mkt.transit}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 13. BUYER TESTIMONIALS: Slow carousel, plain typography */}
      <section className="bg-[#2B2E26] text-[#FAF6EF] py-28 sm:py-36 px-6 sm:px-10 lg:px-12 border-t border-[#3B3F34]">
        <div className="max-w-4xl mx-auto text-center">
          <span className="label-caps text-[#A9BFB1] block mb-6">
            International Buyer References
          </span>

          <div className="min-h-[220px] flex items-center justify-center py-6">
            <blockquote className="font-header text-xl sm:text-2xl md:text-3xl font-light text-[#FAF6EF] leading-relaxed italic">
              "{testimonials[activeTestimonial].quote}"
            </blockquote>
          </div>

          <div className="mt-8 pt-8 border-t border-[#3B3F34]">
            <span className="font-medium text-base text-[#FAF6EF] block font-header">
              {testimonials[activeTestimonial].buyer}
            </span>
            <span className="text-xs sm:text-sm text-[#D9CBB8] block mt-1 font-light">
              {testimonials[activeTestimonial].role} • {testimonials[activeTestimonial].company}
            </span>
            <span className="label-caps text-[#A9BFB1] mt-2 block mb-0">
              {testimonials[activeTestimonial].country}
            </span>
          </div>

          {/* Carousel arrows & dots */}
          <div className="mt-10 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={() =>
                setActiveTestimonial(
                  (activeTestimonial - 1 + testimonials.length) %
                    testimonials.length
                )
              }
              className="p-3 border border-[#3B3F34] hover:border-[#FAF6EF] text-[#D9CBB8] hover:text-[#FAF6EF] transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5 stroke-[1.5]" />
            </button>

            <div className="flex items-center gap-2.5">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActiveTestimonial(i)}
                  className={`w-2.5 h-2.5 transition-all ${
                    activeTestimonial === i
                      ? 'bg-[#B9694A] w-7'
                      : 'bg-[#3B3F34] hover:bg-[#FAF6EF]/40'
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() =>
                setActiveTestimonial((activeTestimonial + 1) % testimonials.length)
              }
              className="p-3 border border-[#3B3F34] hover:border-[#FAF6EF] text-[#D9CBB8] hover:text-[#FAF6EF] transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5 stroke-[1.5]" />
            </button>
          </div>
        </div>
      </section>

      {/* 14. FAQ ACCORDION (MOQ, samples, payment, shipping, customization) */}
      <section className="py-24 sm:py-32 px-6 sm:px-10 lg:px-12 max-w-4xl mx-auto">
        <div className="text-center mb-14">
          <span className="label-caps text-[#B9694A] block mb-2">
            Buyer Frequently Asked Questions
          </span>
          <h2 className="editorial-title text-3xl sm:text-4xl lg:text-5xl text-[#2B2E26]">
            Export Policies &amp; Commercial Terms
          </h2>
        </div>

        <div className="divide-y divide-[#D9CBB8] border-y border-[#D9CBB8]">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div key={index} className="py-6 sm:py-7">
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-full flex items-center justify-between text-left gap-6 group"
                >
                  <span className="font-header text-lg sm:text-xl text-[#2B2E26] group-hover:text-[#B9694A] transition-colors font-medium">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#575C4E] shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[#B9694A]' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <p className="mt-4 text-xs sm:text-sm text-[#575C4E] leading-relaxed pr-8 font-light">
                    {faq.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <p className="text-xs sm:text-sm text-[#575C4E]">
            Have custom requirements or a specialized commercial contract?{' '}
            <Link to="/contact" className="text-[#B9694A] font-medium underline">
              Speak directly with our senior export director
            </Link>
          </p>
        </div>
      </section>

      {/* 15. FINAL RFQ BANNER WITH A CTA */}
      <section className="bg-[#EAE0D0] border-t border-[#D9CBB8] py-24 sm:py-36 px-6 sm:px-10 lg:px-12 text-center">
        <div className="max-w-3xl mx-auto space-y-7">
          <span className="label-caps text-[#B9694A]">
            Direct Manufacturer Pricing • Low MOQ
          </span>

          <h2 className="editorial-title text-3xl sm:text-5xl lg:text-6xl text-[#2B2E26]">
            Ready to Build Your <em>Wholesale</em> Collection?
          </h2>

          <p className="text-sm sm:text-base text-[#575C4E] max-w-xl mx-auto leading-relaxed font-light">
            Submit your style codes, desired quantities, target delivery date, and port of destination. Our commercial export team provides formal CIF/FOB quotations within 24 to 48 hours.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 pt-4">
            <Link to="/contact" className="btn-terracotta py-4 px-9 text-xs tracking-wider">
              <span>Request Quotation</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link to="/collections" className="btn-outline py-4 px-9 text-xs tracking-wider">
              Browse All Styles
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
