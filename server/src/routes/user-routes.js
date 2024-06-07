import { Router } from 'express';
import { changePasswordController } from '../controllers/user-controllers.js';
import { verifyToken } from '../middlewares/verifyToken.js';

const router = Router();

// Change password route
router.patch('/change-password', verifyToken, changePasswordController);

export default router;
