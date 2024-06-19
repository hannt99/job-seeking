import { Router } from 'express';
import {
    getResumeController,
    updateResumeController,
    uploadCVController,
    getAllCVController,
} from '../controllers/resume-controllers.js';
import { verifyToken } from '../middlewares/verifyToken.js';
import upload from '../utils/uploadFile.js';

const router = Router();

// Get resume route
router.get('/get', verifyToken, getResumeController);

// Get resume route
router.patch('/update', verifyToken, updateResumeController);

// Upload file route
router.post('/upload-cv', verifyToken, upload.array('myCV', 10), uploadCVController);

// Get all cv route
router.get('/get-all-cv', verifyToken, getAllCVController);

export default router;
