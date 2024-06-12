import { Router } from 'express';
import {
    createJobController,
    updateJobController,
    getJobController,
    getAllJobByEmployerController,
    deleteJobByEmployerController,
} from '../controllers/job-controllers.js';
import { verifyToken } from '../middlewares/verifyToken.js';
import { isEmployer } from '../middlewares/role.js';

const router = Router();

// Create job route
router.post('/create', verifyToken, isEmployer, createJobController);

// Update job route
router.put('/update/:jobId', verifyToken, isEmployer, updateJobController);

// Get job route
router.get('/get/:jobId', getJobController);

// Get all job by employer route
router.get('/get-all-by-employer', verifyToken, isEmployer, getAllJobByEmployerController);

// Delete job by employer route
router.delete('/delete/:jobId', verifyToken, isEmployer, deleteJobByEmployerController);

export default router;
