import pool from './db';

export interface SupportTicket {
  id: number;
  user_id: number;
  message: string;
  status: 'open' | 'closed';
  response: string | null;
  created_at: Date;
}

export async function createSupportTicket(user_id: number, message: string): Promise<SupportTicket> {
  const result = await pool.query(
    `INSERT INTO support_tickets (user_id, message, status) VALUES ($1, $2, 'open') RETURNING *`,
    [user_id, message]
  );
  return result.rows[0];
}

export async function getUserTickets(user_id: number): Promise<SupportTicket[]> {
  const result = await pool.query(`SELECT * FROM support_tickets WHERE user_id = $1`, [user_id]);
  return result.rows;
}

export async function getAllTickets(): Promise<SupportTicket[]> {
  const result = await pool.query(`SELECT * FROM support_tickets`);
  return result.rows;
}

export async function respondToTicket(id: number, response: string): Promise<SupportTicket> {
  const result = await pool.query(
    `UPDATE support_tickets SET response = $1, status = 'closed' WHERE id = $2 RETURNING *`,
    [response, id]
  );
  return result.rows[0];
}
