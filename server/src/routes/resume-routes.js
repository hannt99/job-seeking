import { Router } from 'express';
import { getResumeController, updateResumeController } from '../controllers/resume-controllers.js';
import { verifyToken } from '../middlewares/verifyToken.js';

const router = Router();

// Get resume route
router.get('/get', verifyToken, getResumeController);

// Get resume route
router.patch('/update', verifyToken, updateResumeController);

export default router;
