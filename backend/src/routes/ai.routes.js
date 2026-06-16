import { Router } from 'express';
import { evaluateSingleAnswer, evaluateInterviewSession } from '../controllers/ai.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = Router();

router.use(protect);

router.post('/evaluate', evaluateSingleAnswer);
router.post('/evaluate-session', evaluateInterviewSession);

export default router;
