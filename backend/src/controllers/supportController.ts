import { Request, Response } from 'express';
import { createSupportTicket, getUserTickets, getAllTickets, respondToTicket } from '../models/supportTicket';

export async function submitTicket(req: Request, res: Response) {
  const user_id = (req as any).user.id;
  const { message } = req.body;
  if (!message) return res.status(400).json({ message: 'Message required' });
  const ticket = await createSupportTicket(user_id, message);
  res.status(201).json(ticket);
}

export async function userTickets(req: Request, res: Response) {
  const user_id = (req as any).user.id;
  const tickets = await getUserTickets(user_id);
  res.json(tickets);
}

export async function allTickets(req: Request, res: Response) {
  const tickets = await getAllTickets();
  res.json(tickets);
}

export async function respondTicket(req: Request, res: Response) {
  const { id } = req.params;
  const { response } = req.body;
  if (!response) return res.status(400).json({ message: 'Response required' });
  const ticket = await respondToTicket(Number(id), response);
  res.json(ticket);
}
