export type UserRole = 'customer' | 'admin' | 'vendor';

export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone?: string;
  role: UserRole;
  created_at: string;
  updated_at: string;
  is_active: boolean;
}

export interface Product {
  id: string;
  vendor_id?: string;
  name: string;
  slug: string;
  description?: string;
  price: number;
  compare_at_price?: number;
  cost?: number;
  sku?: string;
  barcode?: string;
  inventory: number;
  track_inventory: boolean;
  category?: string;
  tags: string[]; // Stored as JSON string in DB
  images: string[]; // Stored as JSON string in DB
  is_active: boolean;
  is_featured: boolean;
  weight?: number;
  dimensions?: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';

export interface Order {
  id: string;
  order_number: string;
  user_id: string;
  status: OrderStatus;
  subtotal: number;
  tax: number;
  shipping_cost: number;
  discount: number;
  total: number;
  currency: string;
  notes?: string;
  shipping_address?: Record<string, any>;
  billing_address?: Record<string, any>;
  created_at: string;
  updated_at: string;
  shipped_at?: string;
  delivered_at?: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  unit_price: number;
  total_price: number;
  discount: number;
  sku?: string;
  name: string;
  created_at: string;
}

export interface CartItem {
  id: string;
  user_id: string;
  product_id: string;
  quantity: number;
  selected_options?: Record<string, any>;
  created_at: string;
  updated_at: string;
  product?: Product; // Populated in frontend
}

export interface Payment {
  id: string;
  order_id: string;
  user_id: string;
  amount: number;
  currency: string;
  method: string;
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'refunded' | 'cancelled';
  transaction_id?: string;
  gateway_response?: Record<string, any>;
  refund_amount: number;
  refund_reason?: string;
  processed_at?: string;
  created_at: string;
  updated_at: string;
}
