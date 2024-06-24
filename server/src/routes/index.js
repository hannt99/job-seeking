import { Router } from 'express';
import authRoutes from './auth-routes.js';
import userRoutes from './user-routes.js';
import companyRoutes from './company-routes.js';
import resumeRoutes from './resume-routes.js';
import jobRoutes from './job-routes.js';
import notiRoutes from './notification-routes.js';
import cateRoutes from './category-routes.js';
import skillRoutes from './skill-routes.js';
import posRoutes from './position-routes.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/company', companyRoutes);
router.use('/resume', resumeRoutes);
router.use('/job', jobRoutes);
router.use('/notification', notiRoutes);
router.use('/category', cateRoutes);
router.use('/skill', skillRoutes);
router.use('/position', posRoutes);

export default router;
