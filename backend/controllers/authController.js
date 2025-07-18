import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import admin from '../config/firebaseAdmin.js';

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });

// REGISTER
export const register = async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ msg: 'User already exists' });
  }

  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    password: hashed,
  });

  res.json({ token: generateToken(user._id), user });
};

// LOGIN
export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ msg: 'Invalid credentials' });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ msg: 'Invalid credentials' });
  }

  res.json({ token: generateToken(user._id), user });
};

// GOOGLE LOGIN
export const googleLogin = async (req, res) => {
  const { token } = req.body;

  try {
    const decoded = await admin.auth().verifyIdToken(token);
    const { email, name, picture, uid } = decoded;

    let user = await User.findOne({ email });

    if (user && !user.googleId) {
      return res.status(400).json({
        msg: 'Email is already registered using password. Use email login.',
      });
    }

    if (!user) {
      user = await User.create({
        name,
        email,
        googleId: uid,
        profilePic: picture,
      });
    }

    const jwtToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    const { password, ...userData } = user._doc;
    res.json({ token: jwtToken, user: userData });
  } catch (err) {
    console.error('Google login error:', err.message);
    res.status(401).json({ msg: 'Firebase token verification failed' });
  }
};