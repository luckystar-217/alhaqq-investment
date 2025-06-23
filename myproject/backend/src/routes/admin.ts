import { Router } from 'express';
import { authenticateJWT, authorizeRoles } from '../middleware/auth';
import { creditWallet, debitWallet, getAllUsers, getAllTransactions } from '../controllers/adminController';

const router = Router();

router.get('/users', authenticateJWT, authorizeRoles('admin'), getAllUsers);
router.get('/transactions', authenticateJWT, authorizeRoles('admin'), getAllTransactions);
router.post('/wallet/credit', authenticateJWT, authorizeRoles('admin'), creditWallet);
router.post('/wallet/debit', authenticateJWT, authorizeRoles('admin'), debitWallet);

export default router;
