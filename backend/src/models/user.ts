import pool from './db';

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'investor';
  balance: number;
  created_at: Date;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  balance: number;
  role?: string;
}

export async function createUser(user: Omit<User, 'id' | 'created_at'>): Promise<User> {
  const result = await pool.query(
    `INSERT INTO users (name, email, password, role, balance) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [user.name, user.email, user.password, user.role, user.balance || 0]
  );
  return result.rows[0];
}

export async function findUserByEmail(email: string): Promise<User | null> {
  const result = await pool.query(`SELECT * FROM users WHERE email = $1`, [email]);
  return result.rows[0] || null;
}

export async function findUserById(id: number): Promise<User | null> {
  const result = await pool.query(`SELECT * FROM users WHERE id = $1`, [id]);
  return result.rows[0] || null;
}

export async function updateUserBalance(id: number, balance: number): Promise<User | null> {
  const result = await pool.query(
    `UPDATE users SET balance = $1 WHERE id = $2 RETURNING *`,
    [balance, id]
  );
  return result.rows[0] || null;
}