// import express from 'express';
// import dotenv from 'dotenv';
// import connectDB from './config/db.js';
// import postRoutes from './routes/postRoutes.js';
// import tagRoutes from './routes/tagRoutes.js';
// import path from 'path';

// dotenv.config();

// const app = express();
// connectDB();

// app.use(express.json()); // Body parsing middleware

// // Serve Static Files
// app.use(express.static(path.join(path.resolve(), 'public')));

// // API Routes
// app.use('/api/posts', postRoutes);
// app.use('/api/tags', tagRoutes);

// // Landing Page Route
// app.get('/', (req, res) => {
//     res.sendFile(path.join(path.resolve(), 'public', 'index.html'));
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import postRoutes from './routes/postRoutes.js';
import tagRoutes from './routes/tagRoutes.js';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// Resolve __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve Static Files
app.use(express.static(path.join(__dirname, '../public')));

// Landing Page Route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// API Routes
app.use('/api/posts', postRoutes);
app.use('/api/tags', tagRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
