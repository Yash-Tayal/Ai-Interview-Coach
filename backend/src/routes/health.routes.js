import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.json({
    success: true,
    status: 'ok',
    message: 'AI Interview Coach API is running',
    timestamp: new Date().toISOString(),
  });
});

export default router;
