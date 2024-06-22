import { Router } from 'express';
import {
    getCompanyByEmployerController,
    updateCompanyController,
    changeAvatarController,
    getAllCompanyController,
    getCompanyController,
    addFollowerController,
    removeFollowerController,
    getAllFollowedCompanyController,
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

// Add follower route
router.patch('/add-follower/:companyId', verifyToken, addFollowerController);

// Add remove route
router.patch('/remove-follower/:companyId', verifyToken, removeFollowerController);

// Get all followed company route
router.get('/get-all-followed-company', verifyToken, getAllFollowedCompanyController);

export default router;
