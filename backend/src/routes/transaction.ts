import { Router } from 'express';
import { createTransaction, getUserTransactions } from '../models/transaction';
import { authenticateJWT } from '../middleware/auth';

const router = Router();

router.post('/', authenticateJWT, async (req, res) => {
  const { investment_product_id, amount, type } = req.body;
  const user_id = (req as any).user.id;
  const tx = await createTransaction({ user_id, investment_product_id, amount, type });
  res.status(201).json(tx);
});

router.get('/', authenticateJWT, async (req, res) => {
  const user_id = (req as any).user.id;
  const txs = await getUserTransactions(user_id);
  res.json(txs);
});

export default router;
