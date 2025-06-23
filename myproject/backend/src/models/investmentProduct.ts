import { Pool } from 'pg';
import pool from './db'; // Corrected import path

// If your db.ts exports a Pool instance, make sure it's like:
// import { Pool } from 'pg';
// const pool = new Pool({ /* config */ });
// export default pool;

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
