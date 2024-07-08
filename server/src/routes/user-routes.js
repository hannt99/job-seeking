import { Router } from 'express';
import {
    getAllUserController,
    deleteUserByIdController,
    changePasswordController,
    updateUserController,
    changeAvatarController,
    changeAppearanceController,
    changeSeekingStatusController,
    getEmployerDashboardController,
    getCandidateChartDataController,
    getAdminDashboardController,
    getJobChartDataController,
} from '../controllers/user-controllers.js';
import { verifyToken } from '../middlewares/verifyToken.js';
import { isEmployer, isAdmin } from '../middlewares/role.js';
import upload from '../utils/uploadFile.js';

const router = Router();

// Get all user route
router.get('/get-all', verifyToken, isAdmin, getAllUserController);

// Delete user by id route
router.delete('/delete/:userId', verifyToken, isAdmin, deleteUserByIdController);

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

// Get job chart data route
router.get('/get-candidate-chart', verifyToken, isEmployer, getCandidateChartDataController);

// Get admin dashboard route
router.get('/get-admin-dashboard', verifyToken, isAdmin, getAdminDashboardController);

// Get jobs dashboard route
router.get('/get-jobs-chart', verifyToken, isAdmin, getJobChartDataController);

export default router;
