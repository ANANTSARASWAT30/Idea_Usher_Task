import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import postRoutes from './routes/postRoutes.js';
import tagRoutes from './routes/tagRoutes.js';

dotenv.config();

const app = express();
connectDB();

app.use(express.json()); // Body parsing middleware

app.use('/api/posts', postRoutes);
app.use('/api/tags', tagRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
