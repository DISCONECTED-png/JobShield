import express from 'express';
import { login, register, googleLogin } from '../controllers/authController.js';
import protect from '../middleware/authMiddleware.js';
import User from '../models/User.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/google', googleLogin);
router.get("/me", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    console.error("Error in /me route:", err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
