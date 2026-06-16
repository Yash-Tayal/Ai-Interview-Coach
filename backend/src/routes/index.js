import { Router } from 'express';
import healthRoutes from './health.routes.js';
import authRoutes from './auth.routes.js';
import questionRoutes from './question.routes.js';
import interviewRoutes from './interview.routes.js';
import dashboardRoutes from './dashboard.routes.js';

const router = Router();

router.use('/health', healthRoutes);
router.use('/auth', authRoutes);
router.use('/questions', questionRoutes);
router.use('/interviews', interviewRoutes);
router.use('/dashboard', dashboardRoutes);

export default router;
