import { PRODUCTS } from '../data/products';
import { Product, FilterState, BuyerUser } from '../types';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const apiService = {
  async getProducts(filters?: Partial<FilterState>): Promise<Product[]> {
    await delay(250);
    let list = [...PRODUCTS];

    if (filters?.category && filters.category !== 'all') {
      list = list.filter((p) => p.category === filters.category);
    }

    if (filters?.fabric && filters.fabric !== 'all') {
      list = list.filter((p) => p.fabric.toLowerCase().includes(filters.fabric!.toLowerCase()));
    }

    if (filters?.season && filters.season !== 'all') {
      list = list.filter((p) => p.season.toLowerCase().includes(filters.season!.toLowerCase()));
    }

    if (filters?.moqMax && filters.moqMax > 0) {
      list = list.filter((p) => p.moq <= filters.moqMax!);
    }

    if (filters?.color && filters.color !== 'all') {
      list = list.filter((p) =>
        p.colors.some((c) => c.name.toLowerCase().includes(filters.color!.toLowerCase()))
      );
    }

    if (filters?.searchQuery && filters.searchQuery.trim() !== '') {
      const q = filters.searchQuery.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.styleCode.toLowerCase().includes(q) ||
          p.subcategory.toLowerCase().includes(q) ||
          p.fabric.toLowerCase().includes(q) ||
          p.composition.toLowerCase().includes(q)
      );
    }

    // Sort
    if (filters?.sortBy) {
      switch (filters.sortBy) {
        case 'fob-asc':
          list.sort((a, b) => a.fobStartingPrice - b.fobStartingPrice);
          break;
        case 'fob-desc':
          list.sort((a, b) => b.fobStartingPrice - a.fobStartingPrice);
          break;
        case 'moq-asc':
          list.sort((a, b) => a.moq - b.moq);
          break;
        case 'moq-desc':
          list.sort((a, b) => b.moq - a.moq);
          break;
        case 'name-asc':
          list.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case 'featured':
        default:
          list.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
          break;
      }
    }

    return list;
  },

  async getProductById(id: string): Promise<Product | undefined> {
    await delay(180);
    return PRODUCTS.find((p) => p.id === id || p.styleCode.toLowerCase() === id.toLowerCase());
  },

  async getProductByCode(styleCode: string): Promise<Product | undefined> {
    await delay(180);
    return PRODUCTS.find(
      (p) => p.styleCode.toLowerCase() === styleCode.toLowerCase() || p.id === styleCode
    );
  },

  async getRelatedProducts(category: string, excludeId: string, limit = 4): Promise<Product[]> {
    await delay(200);
    return PRODUCTS.filter((p) => p.category === category && p.id !== excludeId).slice(0, limit);
  },

  async searchStyles(query: string): Promise<Product[]> {
    await delay(120);
    if (!query || query.trim() === '') return [];
    const q = query.toLowerCase().trim();
    return PRODUCTS.filter(
      (p) =>
        p.styleCode.toLowerCase().includes(q) ||
        p.name.toLowerCase().includes(q) ||
        p.subcategory.toLowerCase().includes(q) ||
        p.fabric.toLowerCase().includes(q)
    ).slice(0, 8);
  },

  async uploadTechPack(file: File): Promise<{ fileName: string; fileSize: string; fileUrl: string }> {
    await delay(800);
    return {
      fileName: file.name,
      fileSize: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
      fileUrl: URL.createObjectURL(file),
    };
  },

  async loginBuyer(email: string): Promise<BuyerUser> {
    await delay(450);
    return {
      id: `usr-${Date.now()}`,
      name: email.split('@')[0].replace('.', ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
      companyName: 'International Wholesale Buyer',
      businessEmail: email,
      country: 'United States',
      phone: '+1 212 555 0192',
      businessType: 'Retailer',
      taxId: 'US-EIN-9920192',
    };
  },

  async registerBuyer(data: {
    name: string;
    companyName: string;
    businessEmail: string;
    country: string;
    phone: string;
    businessType: string;
  }): Promise<BuyerUser> {
    await delay(600);
    return {
      id: `usr-${Date.now()}`,
      ...data,
    };
  },

  async subscribeCatalog(email: string, company: string): Promise<boolean> {
    await delay(400);
    console.log('Catalog subscription request received for:', email, company);
    return true;
  },
};
