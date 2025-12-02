import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './routes/authRoutes.js';
import { errorHandler } from './middlewares/errorHandler.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('*', (req, res) => {
   res.status(404).json({ success: false, message: 'Route not found' });
});
app.use(errorHandler);

app.listen(port, () => {
   console.log(`Server is running at http://localhost:${port}`);
});
