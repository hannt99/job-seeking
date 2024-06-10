import { Router } from 'express';
import { changePasswordController, updateUserController } from '../controllers/user-controllers.js';
import { verifyToken } from '../middlewares/verifyToken.js';

const router = Router();

// Change password route
router.patch('/change-password', verifyToken, changePasswordController);

// Update user route
router.patch('/update', verifyToken, updateUserController);

export default router;
