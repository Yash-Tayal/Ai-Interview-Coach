import { Router } from 'express';
import { getQuestions, getQuestionOptions } from '../controllers/question.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = Router();

router.use(protect);

router.get('/options', getQuestionOptions);
router.get('/', getQuestions);

export default router;
