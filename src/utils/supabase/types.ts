export type Profile = {
  id: string;
  username: string | null;
  full_name: string | null;
  email?: string;
  updated_at?: string;
};

export type Order = {
  id: number;
  user_id: string;
  total_price: number;
  status: string;
  create_at: string;
  order_items?: OrderItem[]; // Optional, to include items with order
};

export type OrderItem = {
  id: number;
  order_id: number;
  varnt_id: number; // Assuming this is variant_id
  qutitay: number; // Assuming this is quantity
  price_at_purchase: number;
};