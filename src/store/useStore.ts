import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { InquiryItem, BuyerUser, RFQData, Product } from '../types';

interface SoleviaStore {
  // Inquiry List (Wholesale Cart alternative)
  inquiryItems: InquiryItem[];
  addToInquiry: (product: Product, selectedColor?: string, quantity?: number, sizeRatio?: Record<string, number>) => void;
  updateInquiryQty: (id: string, qty: number) => void;
  updateInquirySizeRatio: (id: string, size: string, val: number) => void;
  updateInquiryNotes: (id: string, notes: string) => void;
  removeFromInquiry: (id: string) => void;
  clearInquiry: () => void;
  isDrawerOpen: boolean;
  setDrawerOpen: (open: boolean) => void;

  // Saved Styles (Wishlist)
  savedStyleCodes: string[];
  toggleSaveStyle: (styleCode: string) => void;
  isStyleSaved: (styleCode: string) => boolean;

  // Buyer Auth & Session
  user: BuyerUser | null;
  setUser: (user: BuyerUser | null) => void;
  logout: () => void;

  // RFQ History
  rfqHistory: RFQData[];
  submitRFQ: (rfqPayload: Omit<RFQData, 'id' | 'rfqNumber' | 'createdAt' | 'status'>) => RFQData;

  // Search Overlay
  isSearchOpen: boolean;
  setSearchOpen: (open: boolean) => void;

  // Toast Notification
  toastMessage: string | null;
  showToast: (msg: string) => void;
  clearToast: () => void;
}

export const useStore = create<SoleviaStore>()(
  persist(
    (set, get) => ({
      // Inquiry
      inquiryItems: [],
      isDrawerOpen: false,
      setDrawerOpen: (open) => set({ isDrawerOpen: open }),

      addToInquiry: (product, selectedColor, quantity, sizeRatio) => {
        const items = get().inquiryItems;
        const color = selectedColor || product.colors[0]?.name || 'Standard';
        const qty = quantity && quantity >= product.moq ? quantity : product.moq;
        
        // Build balanced default size ratio if not provided
        const defaultRatio: Record<string, number> = {};
        if (sizeRatio && Object.keys(sizeRatio).length > 0) {
          Object.assign(defaultRatio, sizeRatio);
        } else {
          const count = product.sizes.length || 1;
          const perSize = Math.floor(qty / count);
          let remainder = qty % count;
          product.sizes.forEach((s) => {
            defaultRatio[s] = perSize + (remainder > 0 ? 1 : 0);
            if (remainder > 0) remainder--;
          });
        }

        const existingIndex = items.findIndex(
          (i) => i.product.id === product.id && i.selectedColor === color
        );

        if (existingIndex > -1) {
          const updated = [...items];
          updated[existingIndex].quantity += qty;
          set({ inquiryItems: updated, isDrawerOpen: true });
          get().showToast(`Updated inquiry quantity for ${product.styleCode}`);
        } else {
          const newItem: InquiryItem = {
            id: `${product.id}-${color}-${Date.now()}`,
            product,
            selectedColor: color,
            quantity: qty,
            sizeRatio: defaultRatio,
          };
          set({ inquiryItems: [...items, newItem], isDrawerOpen: true });
          get().showToast(`Added ${product.styleCode} (${qty} ${product.moqUnit}) to Inquiry List`);
        }
      },

      updateInquiryQty: (id, qty) => {
        const items = get().inquiryItems.map((item) => {
          if (item.id === id) {
            // Rebalance sizes proportionally
            const oldQty = item.quantity;
            const newQty = Math.max(1, qty);
            const ratio: Record<string, number> = {};
            const sizes = item.product.sizes;
            const factor = newQty / (oldQty || 1);
            
            sizes.forEach((s) => {
              const currentVal = item.sizeRatio[s] || Math.floor(newQty / sizes.length);
              ratio[s] = Math.max(0, Math.round(currentVal * factor));
            });
            return { ...item, quantity: newQty, sizeRatio: ratio };
          }
          return item;
        });
        set({ inquiryItems: items });
      },

      updateInquirySizeRatio: (id, size, val) => {
        const items = get().inquiryItems.map((item) => {
          if (item.id === id) {
            const newRatio = { ...item.sizeRatio, [size]: Math.max(0, val) };
            const total = Object.values(newRatio).reduce((a, b) => a + b, 0);
            return { ...item, sizeRatio: newRatio, quantity: total };
          }
          return item;
        });
        set({ inquiryItems: items });
      },

      updateInquiryNotes: (id, notes) => {
        const items = get().inquiryItems.map((item) =>
          item.id === id ? { ...item, customNotes: notes } : item
        );
        set({ inquiryItems: items });
      },

      removeFromInquiry: (id) => {
        const item = get().inquiryItems.find((i) => i.id === id);
        set({
          inquiryItems: get().inquiryItems.filter((i) => i.id !== id),
        });
        if (item) {
          get().showToast(`Removed ${item.product.styleCode} from Inquiry List`);
        }
      },

      clearInquiry: () => set({ inquiryItems: [] }),

      // Saved Styles
      savedStyleCodes: [],
      toggleSaveStyle: (styleCode) => {
        const saved = get().savedStyleCodes;
        const exists = saved.includes(styleCode);
        const updated = exists ? saved.filter((c) => c !== styleCode) : [...saved, styleCode];
        set({ savedStyleCodes: updated });
        get().showToast(
          exists ? `Removed ${styleCode} from Saved Styles` : `Saved ${styleCode} to Saved Styles`
        );
      },
      isStyleSaved: (styleCode) => get().savedStyleCodes.includes(styleCode),

      // Auth
      user: {
        id: 'usr-demo-01',
        name: 'Camilla Laurent',
        companyName: 'Maison Mer Boutiques',
        businessEmail: 'buyer@maisonmer.fr',
        country: 'France',
        phone: '+33 6 49 20 18 90',
        businessType: 'Boutique Chain',
        taxId: 'FR-9482910482',
      },
      setUser: (user) => set({ user }),
      logout: () => {
        set({ user: null });
        get().showToast('Logged out of buyer account');
      },

      // RFQ History
      rfqHistory: [
        {
          id: 'rfq-2026-0312',
          rfqNumber: 'RFQ-2026-0312',
          createdAt: '2026-09-18T10:30:00Z',
          company: {
            companyName: 'Maison Mer Boutiques',
            contactPerson: 'Camilla Laurent',
            businessType: 'Boutique Chain',
            website: 'https://maisonmer.fr',
            email: 'buyer@maisonmer.fr',
            phone: '+33 6 49 20 18 90',
            country: 'France',
            city: 'Nice',
            address: '14 Promenade des Anglais',
            taxId: 'FR-9482910482',
          },
          requirements: {
            targetQuantityTotal: 650,
            incoterm: 'FOB',
            destinationPort: 'Le Havre Port / Marseille Port',
            targetDeliveryDate: '2027-01-15',
            packagingLabeling: 'Recycled woven neck tags + FSC card stock hangtags',
            customizationNotes: 'Pantone custom dye for Terracotta shade, antique gold metal hardware on bikinis',
            sampleRequired: true,
            techPackFileName: 'Maison_Mer_Resort_2027_SpecPack.pdf',
          },
          items: [],
          status: 'Sample Sent',
          estimatedTotalUSD: 7240,
        },
      ],

      submitRFQ: (payload) => {
        const rand = Math.floor(1000 + Math.random() * 9000);
        const rfqNumber = `RFQ-2026-${rand}`;
        const newRFQ: RFQData = {
          ...payload,
          id: `rfq-${Date.now()}`,
          rfqNumber,
          createdAt: new Date().toISOString(),
          status: 'Submitted',
        };

        set({
          rfqHistory: [newRFQ, ...get().rfqHistory],
          inquiryItems: [],
        });
        get().showToast(`Quote Request ${rfqNumber} successfully submitted!`);
        return newRFQ;
      },

      // Search overlay
      isSearchOpen: false,
      setSearchOpen: (open) => set({ isSearchOpen: open }),

      // Toast
      toastMessage: null,
      showToast: (msg) => {
        set({ toastMessage: msg });
        setTimeout(() => {
          if (get().toastMessage === msg) {
            set({ toastMessage: null });
          }
        }, 3600);
      },
      clearToast: () => set({ toastMessage: null }),
    }),
    {
      name: 'solevia-b2b-store',
      partialize: (state) => ({
        inquiryItems: state.inquiryItems,
        savedStyleCodes: state.savedStyleCodes,
        user: state.user,
        rfqHistory: state.rfqHistory,
      }),
    }
  )
);
