import express from 'express';
import path from 'path';
import fs from 'fs';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { initializeDB } from './config/db.js';
import authRoutes from './routes/auth.routes.js';
import productRoutes from './routes/product.routes.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Disable ETag globally to avoid 304 responses for API endpoints during development
app.disable('etag');

// Middleware
const allowedOriginsEnv = process.env.ALLOWED_ORIGINS || process.env.ALLOWED_ORIGIN;
const allowedOrigins = allowedOriginsEnv
  ? allowedOriginsEnv.split(',').map((origin) => origin.trim()).filter(Boolean)
  : ['http://localhost:8080'];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) {
      return callback(null, true);
    }

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    console.warn(`CORS blocked request from origin: ${origin}`);
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  exposedHeaders: ['Content-Range', 'X-Total-Count'],
  maxAge: 600, // 10 minutes
  preflightContinue: false,
  optionsSuccessStatus: 204
};

// Enable pre-flight across-the-board
app.options('*', cors(corsOptions));
app.use(cors(corsOptions));

app.use(express.json());
app.use(morgan('dev'));

// Serve static assets from `public/images` first, then fall back to `src/assets`.

// Serve files requested under /images/products/... from src/assets so requests like
// /images/products/product-ceramic-bowl.jpg map to src/assets/product-ceramic-bowl.jpg
app.use('/images/products', express.static(path.join(process.cwd(), '..', 'src', 'assets')));

app.use('/images', express.static(path.join(process.cwd(), '..', 'public', 'images')));
app.use('/images', express.static(path.join(process.cwd(), '..', 'src', 'assets')));

// If image not found in either folder, redirect to deterministic picsum placeholder
app.use('/images', (req, res) => {
  const requestedPath = decodeURIComponent(req.path || '');
  const seed = path.basename(requestedPath, path.extname(requestedPath)) || 'product';
  return res.redirect(302, `https://picsum.photos/seed/${encodeURIComponent(seed)}/600/600`);
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'UP', timestamp: new Date() });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false, 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

// Initialize database and start server
const startServer = async () => {
  try {
    await initializeDB();
    console.log('Connected to PostgreSQL');
    
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
    process.exit(1);
  }
};

startServer();

export default app;
