import { Router } from 'express';
import { getCompanyController, updateCompanyController } from '../controllers/company-controllers.js';
import { verifyToken } from '../middlewares/verifyToken.js';

const router = Router();

// Get company route
router.get('/get', verifyToken, getCompanyController);

// Update company route
router.patch('/update', verifyToken, updateCompanyController);

export default router;
