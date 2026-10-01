export type ProductCategory = 'swimwear' | 'dresses' | 'boutique';

export interface PriceTier {
  tier: string;
  minQty: number;
  price: number; // FOB USD
}

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  styleCode: string; // e.g. SOL-SW-001
  name: string;
  category: ProductCategory;
  categoryLabel: string;
  subcategory: string;
  fabric: string;
  composition: string;
  gsm: string; // e.g. "190-210 GSM"
  colors: ProductColor[];
  sizes: string[];
  moq: number; // e.g. 300 pcs
  moqUnit: string;
  fobStartingPrice: number; // USD
  fobPriceTiers: PriceTier[];
  productionLeadTime: string; // e.g. "30-40 days"
  sampleLeadTime: string; // e.g. "5-7 days"
  sampleFee: string; // e.g. "$45 refundable against bulk"
  packaging: string;
  customizationOptions: string[];
  images: string[];
  description: string;
  season: string;
  isFeatured?: boolean;
  inStockSamples?: boolean;
  aspectRatio?: 'portrait' | 'landscape' | 'square';
}

export interface InquiryItem {
  id: string; // unique item id
  product: Product;
  selectedColor: string;
  sizeRatio: Record<string, number>; // e.g. { 'S': 50, 'M': 100, 'L': 100, 'XL': 50 }
  quantity: number;
  targetFobPrice?: number;
  customNotes?: string;
  sampleRequested?: boolean;
}

export type RFQStatus = 'Submitted' | 'Under Review' | 'Quoted' | 'Sample Sent';

export interface CompanyDetails {
  companyName: string;
  contactPerson: string;
  businessType: 'Retailer' | 'Boutique Chain' | 'Fashion Brand / Label' | 'Wholesale Importer' | 'Department Store';
  website: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  address: string;
  taxId?: string;
}

export interface ProductionRequirements {
  targetQuantityTotal: number;
  incoterm: 'FOB' | 'CIF' | 'EXW' | 'DDP';
  destinationPort: string;
  targetDeliveryDate: string;
  packagingLabeling: string;
  customizationNotes: string;
  sampleRequired: boolean;
  techPackFileName?: string;
}

export interface RFQData {
  id: string;
  rfqNumber: string; // e.g. RFQ-2026-1042
  createdAt: string;
  company: CompanyDetails;
  requirements: ProductionRequirements;
  items: InquiryItem[];
  status: RFQStatus;
  estimatedTotalUSD: number;
}

export interface BuyerUser {
  id: string;
  name: string;
  companyName: string;
  businessEmail: string;
  country: string;
  phone: string;
  businessType: string;
  taxId?: string;
}

export interface FilterState {
  category: string;
  fabric: string;
  moqMax: number;
  color: string;
  season: string;
  searchQuery: string;
  sortBy: 'featured' | 'moq-asc' | 'moq-desc' | 'fob-asc' | 'fob-desc' | 'name-asc';
}
