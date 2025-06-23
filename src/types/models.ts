export interface UserProfile {
  id: string;
  name: string;
  email: string;
  balance: number;
  role?: string;
}

export interface Transaction {
  id: string;
  user_id: string;
  investment_product_id: string | null;
  amount: number;
  type: string;
  created_at: string;
}

export interface InvestmentProduct {
  id: string;
  name: string;
  description: string;
  rate: number;
}