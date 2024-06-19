import { Router } from 'express';
import {
    getResumeController,
    updateResumeController,
    uploadCVController,
    getAllCVController,
    deleteCVController,
} from '../controllers/resume-controllers.js';
import { verifyToken } from '../middlewares/verifyToken.js';
import upload from '../utils/uploadFile.js';

const router = Router();

// Get resume route
router.get('/get', verifyToken, getResumeController);

// Get resume route
router.patch('/update', verifyToken, updateResumeController);

// Upload cv route
router.post('/upload-cv', verifyToken, upload.array('myCV', 10), uploadCVController);

// Delete cv route
router.patch('/delete-cv', verifyToken, deleteCVController);

// Get all cv route
router.get('/get-all-cv', verifyToken, getAllCVController);

export default router;
