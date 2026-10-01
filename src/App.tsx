import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { InquiryDrawer } from './components/InquiryDrawer';
import { SearchOverlay } from './components/SearchOverlay';
import { Toast } from './components/Toast';
import { SmoothScroll, scrollToTop } from './components/SmoothScroll';

// Pages
import { Home } from './pages/Home';
import { Collections } from './pages/Collections';
import { CategoryLanding } from './pages/CategoryLanding';
import { ProductDetail } from './pages/ProductDetail';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { RFQConfirmation } from './pages/RFQConfirmation';
import { BuyerAccount } from './pages/BuyerAccount';
import { About } from './pages/About';
import { Manufacturing } from './pages/Manufacturing';
import { PrivateLabel } from './pages/PrivateLabel';
import { SamplingShipping } from './pages/SamplingShipping';
import { Contact } from './pages/Contact';
import { DownloadCatalog } from './pages/DownloadCatalog';
import { NotFound } from './pages/NotFound';

function ScrollToTop() {
  const { pathname, search } = useLocation();
  useEffect(() => {
    scrollToTop();
  }, [pathname, search]);
  return null;
}

export function App() {
  return (
    <BrowserRouter>
      <SmoothScroll>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen bg-[#FAF6EF] text-[#2B2E26]">
          <AnnouncementBar />
          <Header />

          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/collections" element={<Collections />} />
              <Route path="/category/:id" element={<CategoryLanding />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/saved-styles" element={<Navigate to="/collections" replace />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/rfq" element={<Navigate to="/contact" replace />} />
              <Route path="/rfq-confirmation/:rfqNumber" element={<RFQConfirmation />} />
              <Route path="/account" element={<BuyerAccount />} />
              <Route path="/about" element={<About />} />
              <Route path="/manufacturing" element={<Manufacturing />} />
              <Route path="/private-label" element={<PrivateLabel />} />
              <Route path="/sampling-shipping" element={<SamplingShipping />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/download-catalog" element={<DownloadCatalog />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>

          <Footer />

          {/* Global Drawers & Modals */}
          <InquiryDrawer />
          <SearchOverlay />
          <Toast />
        </div>
      </SmoothScroll>
    </BrowserRouter>
  );
}

export default App;
