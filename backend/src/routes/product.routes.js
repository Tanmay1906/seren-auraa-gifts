import { Router } from 'express';
import { getProducts, getProductById, getFeaturedProducts } from '../controllers/product.controller.js';

const router = Router();

// GET /api/products
router.get('/', getProducts);

// GET /api/products/featured
router.get('/featured', getFeaturedProducts);

// GET /api/products/:id
router.get('/:id', getProductById);

export default router;
