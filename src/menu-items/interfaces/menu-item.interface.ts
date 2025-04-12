interface MenuItem {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  is_available: boolean;
  image_url: string;
  discount?: number;
  created_at: Date;
  total_orders: number;
}
