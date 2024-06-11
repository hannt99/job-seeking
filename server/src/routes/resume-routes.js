import { Router } from 'express';
import { getResumeController } from '../controllers/resume-controllers.js';
import { verifyToken } from '../middlewares/verifyToken.js';

const router = Router();

// Get resume route
router.get('/get', verifyToken, getResumeController);

export default router;
