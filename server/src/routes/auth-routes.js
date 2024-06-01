import { Router } from 'express';
import {
    signInController,
    registerController,
    verifyController,
    forgotPasswordController,
    resetPasswordController,
} from '../controllers/auth-controllers.js';

const router = Router();

// Sign in
router.post('/signin', signInController);

// Register
router.post('/register', registerController);

// Veify account route
router.get('/verify', verifyController);

// Forgot password route
router.post('/forgot-password', forgotPasswordController);

// Reset password route
router.patch('/reset-password', resetPasswordController);

export default router;
