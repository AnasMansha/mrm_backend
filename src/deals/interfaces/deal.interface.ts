export interface Deal {
  id?: string;
  name: string;
  deal_for: string[];
  deal_start: Date;
  deal_end: Date;
  deal_scope: string[];
  is_active: boolean;
  amount: number;
}
