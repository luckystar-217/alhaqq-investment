import { Router } from 'express';
import { createInvestmentProduct, getAllInvestmentProducts } from '../models/investmentProduct';
import { authenticateJWT, authorizeRoles } from '../middleware/auth';

const router = Router();

router.post('/', authenticateJWT, authorizeRoles('admin'), async (req, res) => {
  const { name, description, rate } = req.body;
  const product = await createInvestmentProduct({ name, description, rate });
  res.status(201).json(product);
});

router.get('/', authenticateJWT, async (req, res) => {
  const products = await getAllInvestmentProducts();
  res.json(products);
});

export default router;
