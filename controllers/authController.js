import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: "User created", user: { name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    // 🔍 Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ field: 'email', message: 'User not found' });
    }
    // 🔐 Check password
    const isMatch = (password === user.password);
    if (!isMatch) {
      return res.status(401).json({ field: 'password', message: 'Incorrect password' });
    }

    // ✅ Generate token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    return res.status(200).json({
      token,
      userId: user._id
    });

  } catch (err) {
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};
