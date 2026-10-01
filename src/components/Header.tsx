import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, FileText, User, Menu, X, ChevronDown, ArrowRight } from 'lucide-react';
import { useStore } from '../store/useStore';
import { CATEGORIES_CONFIG } from '../data/products';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isHome = location.pathname === '/';
  const { inquiryItems, user, setDrawerOpen, setSearchOpen } = useStore();

  const totalInquiryUnits = inquiryItems.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on page transition
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsMegaMenuOpen(false);
  }, [location.pathname]);

  const headerBgClass = isHome && !isScrolled
    ? 'bg-transparent text-[#2B2E26] border-transparent'
    : 'bg-[#FAF6EF]/95 backdrop-blur-sm text-[#2B2E26] border-b border-[#D9CBB8] shadow-sm';

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${headerBgClass}`}
      >
        <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
          <div className="flex items-center justify-between h-24 gap-4">
            {/* Mobile menu trigger */}
            <div className="flex items-center lg:hidden">
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2.5 -ml-2 text-[#2B2E26] hover:text-[#B9694A] transition-colors"
                aria-label="Toggle navigation menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6 stroke-[1.5]" />
                ) : (
                  <Menu className="w-6 h-6 stroke-[1.5]" />
                )}
              </button>
            </div>

            {/* Brand Wordmark */}
            <div className="flex items-center shrink-0 mr-2 xl:mr-6">
              <Link to="/" className="group flex flex-col items-start py-2 shrink-0 whitespace-nowrap">
                <span className="font-header text-2xl sm:text-3xl tracking-[0.16em] font-normal uppercase text-[#2B2E26] group-hover:text-[#B9694A] transition-colors whitespace-nowrap">
                  Solevia
                </span>
                <span className="text-[0.5625rem] tracking-[0.34em] uppercase text-[#575C4E] font-medium -mt-0.5 whitespace-nowrap">
                  Exports • Manufacturing
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-3 lg:space-x-4 xl:space-x-6 2xl:space-x-8 shrink-0">
              <Link
                to="/"
                className={`sliding-link text-xs xl:text-[0.8125rem] tracking-[0.1em] xl:tracking-[0.14em] shrink-0 whitespace-nowrap ${location.pathname === '/' ? 'sliding-link-active' : ''
                  }`}
              >
                Home
              </Link>

              {/* Collections with Mega Menu */}
              <div
                className="relative py-7 shrink-0"
                onMouseEnter={() => setIsMegaMenuOpen(true)}
                onMouseLeave={() => setIsMegaMenuOpen(false)}
              >
                <Link
                  to="/collections"
                  className={`sliding-link text-xs xl:text-[0.8125rem] tracking-[0.1em] xl:tracking-[0.14em] shrink-0 whitespace-nowrap flex items-center gap-1.5 ${location.pathname.startsWith('/collections') ||
                      location.pathname.startsWith('/category')
                      ? 'sliding-link-active'
                      : ''
                    }`}
                >
                  <span>Collections</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${isMegaMenuOpen ? 'rotate-180 text-[#B9694A]' : ''
                      }`}
                  />
                </Link>

                {/* Collections dropdown (text only - product/collection names) */}
                {isMegaMenuOpen && (
                  <div className="absolute top-full left-0 min-w-[220px] bg-[#FAF6EF] border border-[#D9CBB8] shadow-xl py-1.5 z-50">
                    <div className="py-0.5">
                      {CATEGORIES_CONFIG.map((cat) => (
                        <Link
                          key={cat.id}
                          to={`/category/${cat.id}`}
                          className="block px-5 py-2.5 text-sm tracking-wide font-medium text-[#2B2E26] hover:text-[#B9694A] hover:bg-[#EAE0D0]/50 transition-colors"
                        >
                          {cat.name}
                        </Link>
                      ))}
                      <div className="border-t border-[#D9CBB8]/50 my-1 pt-1">
                        <Link
                          to="/collections"
                          className="block px-5 py-2 text-xs uppercase tracking-wider font-semibold text-[#B9694A] hover:bg-[#EAE0D0]/50 transition-colors"
                        >
                          All Collections
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <Link
                to="/about"
                className={`sliding-link text-xs xl:text-[0.8125rem] tracking-[0.1em] xl:tracking-[0.14em] shrink-0 whitespace-nowrap ${location.pathname === '/about' ? 'sliding-link-active' : ''
                  }`}
              >
                About
              </Link>
              {/* <Link
                to="/manufacturing"
                className={`sliding-link text-xs xl:text-[0.8125rem] tracking-[0.1em] xl:tracking-[0.14em] shrink-0 whitespace-nowrap ${
                  location.pathname === '/manufacturing' ? 'sliding-link-active' : ''
                }`}
              >
                Manufacturing
              </Link> */}

              {/* <Link
                to="/private-label"
                className={`sliding-link text-xs xl:text-[0.8125rem] tracking-[0.1em] xl:tracking-[0.14em] shrink-0 whitespace-nowrap ${
                  location.pathname === '/private-label' ? 'sliding-link-active' : ''
                }`}
              >
                Private Label
              </Link> */}

              <Link
                to="/sampling-shipping"
                className={`sliding-link text-xs xl:text-[0.8125rem] tracking-[0.1em] xl:tracking-[0.14em] shrink-0 whitespace-nowrap ${location.pathname === '/sampling-shipping' ? 'sliding-link-active' : ''
                  }`}
              >
                Shipping & Terms
              </Link>



              <Link
                to="/contact"
                className={`sliding-link text-xs xl:text-[0.8125rem] tracking-[0.1em] xl:tracking-[0.14em] shrink-0 whitespace-nowrap ${location.pathname === '/contact' ? 'sliding-link-active' : ''
                  }`}
              >
                Contact
              </Link>
            </nav>

            {/* Right Action Icons & Request Quote CTA */}
            <div className="flex items-center space-x-2 sm:space-x-3 xl:space-x-4 shrink-0">
              {/* Search button */}
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                className="p-2 xl:p-2.5 text-[#2B2E26] hover:text-[#B9694A] transition-colors shrink-0"
                aria-label="Search wholesale styles"
                title="Search styles & codes"
              >
                <Search className="w-5 h-5 stroke-[1.5]" />
              </button>


              {/* Inquiry Drawer Trigger */}
              {/* <button
                type="button"
                onClick={() => setDrawerOpen(true)}
                className="relative p-2 xl:p-2.5 text-[#2B2E26] hover:text-[#B9694A] transition-colors shrink-0"
                aria-label="Wholesale Inquiry List"
                title="Inquiry List"
              >
                <FileText className="w-5 h-5 stroke-[1.5]" />
                {inquiryItems.length > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-[#2B2E26] text-[#FAF6EF] text-[0.625rem] font-medium flex items-center justify-center rounded-none leading-none">
                    {inquiryItems.length}
                  </span>
                )}
              </button> */}

              {/* Buyer Login / Account */}
              {/* <Link
                to={user ? '/account' : '/login'}
                className="hidden md:flex items-center gap-1.5 p-2 xl:p-2.5 text-[#2B2E26] hover:text-[#B9694A] transition-colors shrink-0 whitespace-nowrap"
                title={user ? `Buyer Portal: ${user.companyName}` : 'Buyer Login'}
              >
                <User className="w-5 h-5 stroke-[1.5] shrink-0" />
                <span className="text-xs uppercase tracking-wider font-montreal font-medium hidden 2xl:inline whitespace-nowrap">
                  {user ? 'Buyer Portal' : 'Login'}
                </span>
              </Link> */}

              {/* Primary "Request Quote" CTA */}
              <Link
                to="/contact"
                className="btn-terracotta hidden sm:inline-flex py-2.5 px-4 xl:py-3 xl:px-5 text-[0.6875rem] shadow-none shrink-0 whitespace-nowrap"
              >
                <span>Request Quote</span>
                {totalInquiryUnits > 0 && (
                  <span className="bg-[#FAF6EF]/20 text-[#FAF6EF] px-1.5 py-0.5 text-[0.5625rem] ml-0.5">
                    {totalInquiryUnits} pcs
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Slide-in Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-[#2B2E26]/60 backdrop-blur-xs transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Drawer content */}
          <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-[#FAF6EF] border-r border-[#D9CBB8] p-6 flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#D9CBB8]">
                <div className="flex flex-col">
                  <span className="font-serif text-2xl tracking-[0.16em] uppercase">
                    Solevia
                  </span>
                  <span className="text-[0.5625rem] tracking-[0.25em] uppercase text-[#575C4E]">
                    Exports • Wholesale
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-[#2B2E26] hover:text-[#B9694A]"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6 stroke-[1.5]" />
                </button>
              </div>

              <div className="py-6 space-y-4">
                <Link
                  to="/"
                  className="block text-base uppercase tracking-wider font-medium text-[#2B2E26] hover:text-[#B9694A]"
                >
                  Home
                </Link>

                <div className="pt-2 pb-2">
                  <div className="text-xs uppercase tracking-widest text-[#B9694A] font-semibold mb-2">
                    Product Categories
                  </div>
                  <div className="pl-3 space-y-2 border-l border-[#D9CBB8]">
                    <Link
                      to="/category/swimwear"
                      className="block text-sm text-[#2B2E26] hover:text-[#B9694A]"
                    >
                      Swimwear (10 Styles)
                    </Link>
                    <Link
                      to="/category/dresses"
                      className="block text-sm text-[#2B2E26] hover:text-[#B9694A]"
                    >
                      Ladies Dresses (10 Styles)
                    </Link>
                    <Link
                      to="/category/boutique"
                      className="block text-sm text-[#2B2E26] hover:text-[#B9694A]"
                    >
                      Boutique Apparel (10 Styles)
                    </Link>
                    <Link
                      to="/collections"
                      className="block text-xs uppercase tracking-wider text-[#B9694A] font-medium pt-1"
                    >
                      All Collections →
                    </Link>
                  </div>
                </div>

                <Link
                  to="/manufacturing"
                  className="block text-base uppercase tracking-wider font-medium text-[#2B2E26] hover:text-[#B9694A]"
                >
                  Manufacturing & QC
                </Link>

                <Link
                  to="/private-label"
                  className="block text-base uppercase tracking-wider font-medium text-[#2B2E26] hover:text-[#B9694A]"
                >
                  Private Label OEM/ODM
                </Link>

                <Link
                  to="/sampling-shipping"
                  className="block text-base uppercase tracking-wider font-medium text-[#2B2E26] hover:text-[#B9694A]"
                >
                  Shipping & Incoterms
                </Link>

                <Link
                  to="/about"
                  className="block text-base uppercase tracking-wider font-medium text-[#2B2E26] hover:text-[#B9694A]"
                >
                  About Our Factory
                </Link>

                <Link
                  to="/contact"
                  className="block text-base uppercase tracking-wider font-medium text-[#2B2E26] hover:text-[#B9694A]"
                >
                  Contact Export Desk
                </Link>
              </div>
            </div>

            {/* Mobile Footer CTAs */}
            <div className="pt-6 border-t border-[#D9CBB8] space-y-3">
              <Link
                to="/contact"
                className="btn-terracotta w-full py-3 text-center justify-center"
              >
                Request Quotation
              </Link>

              <Link
                to={user ? '/account' : '/login'}
                className="btn-outline w-full py-2.5 text-center justify-center text-xs"
              >
                {user ? `Buyer Account (${user.name})` : 'Buyer Portal Login'}
              </Link>

              <div className="text-center text-[0.6875rem] text-[#575C4E] pt-2">
                MOQ 300 pcs • Direct Sea & Air Freight
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
