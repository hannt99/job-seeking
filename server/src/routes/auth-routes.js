import { Router } from 'express';
import {
    signInController,
    registerController,
    verifyController,
    forgotPasswordController,
    resetPasswordController,
    getCurrentUserController,
    signOutController,
} from '../controllers/auth-controllers.js';
import { verifyToken } from '../middlewares/verifyToken.js';

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

// Get current user route
router.get('/get-current-user', verifyToken, getCurrentUserController);

// Sign out route
router.get('/signout', verifyToken, signOutController);

export default router;
