import express from 'express';
import { login, register, getMe, updateProfile, changePassword } from '../controllers/auth.controller.js';
import { protect } from '../middleware/auth.js';
import { loginValidator, registerValidator } from '../middleware/validators/auth.validator.js';

const router = express.Router();

// Public routes
router.post('/register', registerValidator, register);
router.post('/login', loginValidator, login);

// Protected routes
router.get('/me', protect, getMe);
router.patch('/me', protect, updateProfile);
router.patch('/password', protect, changePassword);

export default router;
