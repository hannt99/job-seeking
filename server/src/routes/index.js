import { Router } from 'express';
import authRoutes from './auth-routes.js';
import userRoutes from './user-routes.js';
import companyRoutes from './company-routes.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/company', companyRoutes);

export default router;
