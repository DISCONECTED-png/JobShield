import ScamJob from '../models/ScamJob.js';
import express from 'express';
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const jobs = await ScamJob.find()
      .sort({ timestamp: -1 })
      .limit(limit);
    res.json(jobs);
  } catch (err) {
    console.error('Radar route error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;