// server/routes/authRoutes.js

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');        // For hashing passwords
const jwt = require('jsonwebtoken');       // For JWT authentication
const User = require('../models/User');    // Mongoose User model

// ==================== REGISTER ====================
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    // 1️⃣ Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    // 2️⃣ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3️⃣ Create new user
    const newUser = new User({
      username,
      password: hashedPassword
    });

    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// ==================== LOGIN ====================
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // 1️⃣ Check if user exists
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    // 2️⃣ Compare password with hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Wrong password' });

    // 3️⃣ Generate JWT token
    const token = jwt.sign(
      { username: user.username, id: user._id },
      process.env.JWT_SECRET,      // Make sure you have JWT_SECRET in .env
      { expiresIn: '1d' }
    );

    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
