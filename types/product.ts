export interface Product {
  id: string;
  vendor_id: string | null;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  compare_at_price: number | null;
  cost: number | null;
  sku: string | null;
  barcode: string | null;
  inventory: number;
  track_inventory: boolean;
  category: string | null;
  tags: string[]; // Stored as JSON array in DB
  images: string[]; // Stored as JSON array in DB
  is_active: boolean;
  is_featured: boolean;
  weight: number | null;
  dimensions: {
    length?: number;
    width?: number;
    height?: number;
  } | null; // Stored as JSON object in DB
  created_at: string;
  updated_at: string;
}
