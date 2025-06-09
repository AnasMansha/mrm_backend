export type OrderStatus = 'pending' | 'approved' | 'rejected' | 'completed';

export interface OrderItem {
  id: string;
  order_id: string;
  item_type: 'deal' | 'menu_item';
  amount: number;
  special_instructions: string;
  menu_item_id?: string;
  deal_id?: string;
}

export interface Order {
  id: string;
  created_at: string;
  user_id: string;
  details: any;
  status: OrderStatus;
  total_amount: string;
  total_items: string;
}
