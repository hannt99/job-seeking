import { Router } from 'express';
import {
    createJobController,
    updateJobController,
    getJobController,
    getAllJobByEmployerController,
    deleteJobByEmployerController,
    getAllJobController,
    saveJobController,
    unsaveJobController,
    getSaveJobController,
    getRelativeJobController,
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

// Get all job route
router.get('/get-all', getAllJobController);

// Save job route
router.patch('/save-job', verifyToken, saveJobController);

// Unsave job route
router.patch('/unsave-job', verifyToken, unsaveJobController);

// Get save job route
router.get('/get-save-job', verifyToken, getSaveJobController);

// Get relative job route
router.get('/get-relative-job', getRelativeJobController);

export default router;
