import { Router } from 'express';
import {
    changePasswordController,
    updateUserController,
    changeAvatarController,
    changeAppearanceController,
    changeSeekingStatusController,
    getEmployerDashboardController,
} from '../controllers/user-controllers.js';
import { verifyToken } from '../middlewares/verifyToken.js';
import { isEmployer } from '../middlewares/role.js';
import upload from '../utils/uploadFile.js';

const router = Router();

// Change password route
router.patch('/change-password', verifyToken, changePasswordController);

// Update user route
router.patch('/update', verifyToken, updateUserController);

// Change avatar route
router.post('/change-avatar', verifyToken, upload.single('avatar'), changeAvatarController);

// Change user appearance route
router.patch('/change-appearance', verifyToken, changeAppearanceController);

// Change user seeking status route
router.patch('/change-seeking-status', verifyToken, changeSeekingStatusController);

// Get employer dashboard route
router.get('/get-employer-dashboard', verifyToken, isEmployer, getEmployerDashboardController);

export default router;
