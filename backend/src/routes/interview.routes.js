import { Router } from 'express';
import {
  submitInterview,
  getUserInterviews,
  getInterviewSession,
} from '../controllers/interview.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = Router();

router.use(protect);

router.get('/', getUserInterviews);
router.get('/:id', getInterviewSession);
router.post('/', submitInterview);

export default router;
