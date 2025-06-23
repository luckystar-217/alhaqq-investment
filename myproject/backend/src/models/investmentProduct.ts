import { pool } from './db';

export interface InvestmentProduct {
  id: number;
  name: string;
  description: string;
  rate: number;
  created_at: Date;
}

export async function createInvestmentProduct(product: Omit<InvestmentProduct, 'id' | 'created_at'>): Promise<InvestmentProduct> {
  const result = await pool.query(
    `INSERT INTO investment_products (name, description, rate) VALUES ($1, $2, $3) RETURNING *`,
    [product.name, product.description, product.rate]
  );
  return result.rows[0];
}

export async function getAllInvestmentProducts(): Promise<InvestmentProduct[]> {
  const result = await pool.query(`SELECT * FROM investment_products`);
  return result.rows;
}
