import { Router } from 'express';
import {
    getCompanyController,
    updateCompanyController,
    changeAvatarController,
} from '../controllers/company-controllers.js';
import { verifyToken } from '../middlewares/verifyToken.js';
import upload from '../utils/uploadFile.js';

const router = Router();

// Get company route
router.get('/get', verifyToken, getCompanyController);

// Update company route
router.patch('/update', verifyToken, updateCompanyController);

// Change avatar route
router.post('/change-avatar', verifyToken, upload.single('companyAvatar'), changeAvatarController);

export default router;
