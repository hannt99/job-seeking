import { Router } from 'express';
import {
    createJobController,
    updateJobController,
    getAllJobBySpecificEmployerController,
} from '../controllers/job-controllers.js';
import { verifyToken } from '../middlewares/verifyToken.js';
import { isEmployer } from '../middlewares/role.js';

const router = Router();

// Create job route
router.post('/create', verifyToken, isEmployer, createJobController);

// Update job route
router.put('/update', verifyToken, isEmployer, updateJobController);

// Get all job by specific employer route
router.put('/get-all', verifyToken, isEmployer, getAllJobBySpecificEmployerController);

export default router;
