import { Request, Response } from 'express';
import { findUserById, updateUserBalance } from '../models/user';
import { Pool } from 'pg';
import { pool } from '../models/db'; // pool should be an instance of pg.Pool

// Ensure that pool is exported as a Pool instance in ../models/db

export async function getAllUsers(req: Request, res: Response) {
  const result = await pool.query('SELECT id, name, email, role, balance, created_at FROM users');
  res.json(result.rows);
}

export async function getAllTransactions(req: Request, res: Response) {
  const result = await pool.query('SELECT * FROM transactions');
  res.json(result.rows);
}

export async function creditWallet(req: Request, res: Response) {
  const { userId, amount } = req.body;
  if (!userId || !amount || amount <= 0) return res.status(400).json({ message: 'Invalid input' });
  const user = await findUserById(userId);
  if (!user) return res.status(404).json({ message: 'User not found' });
  const newBalance = Number(user.balance) + Number(amount);
  const updated = await updateUserBalance(userId, newBalance);
  res.json({ message: 'Wallet credited', user: updated });
}

export async function debitWallet(req: Request, res: Response) {
  const { userId, amount } = req.body;
  if (!userId || !amount || amount <= 0) return res.status(400).json({ message: 'Invalid input' });
  const user = await findUserById(userId);
  if (!user) return res.status(404).json({ message: 'User not found' });
  if (user.balance < amount) return res.status(400).json({ message: 'Insufficient balance' });
  const newBalance = Number(user.balance) - Number(amount);
  const updated = await updateUserBalance(userId, newBalance);
  res.json({ message: 'Wallet debited', user: updated });
}

const pool = new Pool({
  // your database config here
});

export { pool };
