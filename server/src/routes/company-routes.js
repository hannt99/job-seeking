import { Router } from 'express';
import {
    getCompanyByEmployerController,
    updateCompanyController,
    changeAvatarController,
    getAllCompanyController,
    getCompanyController,
} from '../controllers/company-controllers.js';
import { verifyToken } from '../middlewares/verifyToken.js';
import { isEmployer } from '../middlewares/role.js';
import upload from '../utils/uploadFile.js';

const router = Router();

// Get company by employer route
router.get('/get-by-employer', verifyToken, isEmployer, getCompanyByEmployerController);

// Update company route
router.patch('/update', verifyToken, isEmployer, updateCompanyController);

// Change avatar route
router.post('/change-avatar', verifyToken, isEmployer, upload.single('companyAvatar'), changeAvatarController);

// Get all company route
router.get('/get-all', getAllCompanyController);

// Get company by employer route
router.get('/get/:companyId', getCompanyController);

export default router;
