import { Router } from 'express';
import {
    changePasswordController,
    updateUserController,
    changeAvatarController,
} from '../controllers/user-controllers.js';
import { verifyToken } from '../middlewares/verifyToken.js';
import upload from '../utils/uploadFile.js';

const router = Router();

// Change password route
router.patch('/change-password', verifyToken, changePasswordController);

// Update user route
router.patch('/update', verifyToken, updateUserController);

// Change avatar route
router.post('/change-avatar', verifyToken, upload.single('avatar'), changeAvatarController);

export default router;
