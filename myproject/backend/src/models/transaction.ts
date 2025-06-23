import pool from '../models/db';

export interface Transaction {
  id: string;
  user_id: string;
  investment_product_id: string | null;
  amount: number;
  type: 'invest' | 'withdraw';
  created_at: Date;
}

export async function createTransaction(tx: Omit<Transaction, 'id' | 'created_at'>): Promise<Transaction> {
  const result = await pool.query(
    `INSERT INTO transactions (user_id, investment_product_id, amount, type) VALUES ($1, $2, $3, $4) RETURNING *`,
    [tx.user_id, tx.investment_product_id, tx.amount, tx.type]
  );
  return result.rows[0];
}

export async function getUserTransactions(user_id: string): Promise<Transaction[]> {
  const result = await pool.query(`SELECT * FROM transactions WHERE user_id = $1`, [user_id]);
  return result.rows;
}
