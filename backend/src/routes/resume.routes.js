import { Router } from 'express';
import {
  uploadAndAnalyzeResume,
  getResumeHistory,
  getResumeById,
} from '../controllers/resume.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { uploadResume, handleUploadError } from '../middleware/upload.middleware.js';

const router = Router();

router.use(protect);

router.post(
  '/upload',
  (req, res, next) => {
    uploadResume(req, res, (err) => {
      if (err) {
        handleUploadError(err, req, res, next);
        return;
      }
      next();
    });
  },
  uploadAndAnalyzeResume
);

router.get('/history', getResumeHistory);
router.get('/:id', getResumeById);

export default router;
