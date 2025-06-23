import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import investmentRoutes from './routes/investment';
import transactionRoutes from './routes/transaction';
import swaggerRoutes from './routes/swagger';
import adminRoutes from './routes/admin';
import supportRoutes from './routes/support';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Alhaqq Investment API is running');
});

app.use('/api/auth', authRoutes);
app.use('/api/investments', investmentRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/docs', swaggerRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/support', supportRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
