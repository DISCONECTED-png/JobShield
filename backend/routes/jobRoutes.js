import express from 'express';
import multer from 'multer';

import {
  submitJobReport,
  getUserReports,
  getPublicJobs,
  voteOnJob,
} from '../controllers/jobController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/submit', protect, upload.single('image'), submitJobReport);
router.get('/my-reports', protect, getUserReports);
router.get('/public', getPublicJobs);
router.post('/:id/vote', protect, voteOnJob);

export default router;
