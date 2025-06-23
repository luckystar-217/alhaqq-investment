import { Router } from 'express';
import { authenticateJWT, authorizeRoles } from '../middleware/auth';
import { submitTicket, userTickets, allTickets, respondTicket } from '../controllers/supportController';

const router = Router();

router.post('/', authenticateJWT, submitTicket);
router.get('/my', authenticateJWT, userTickets);
router.get('/all', authenticateJWT, authorizeRoles('admin'), allTickets);
router.post('/:id/respond', authenticateJWT, authorizeRoles('admin'), respondTicket);

export default router;
