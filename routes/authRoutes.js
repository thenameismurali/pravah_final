import express from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

const router = express.Router();

/* ================= SIGNUP ================= */
router.post("/signup", async (req, res) => {
  const { name, email, password, role, institution } = req.body;

  const exists = await User.findOne({ email });
  if (exists) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role,
    institution,
  });

  const token = generateToken(user);

  res.status(201).json({
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      institution: user.institution,
    },
  });
});

/* ================= LOGIN ================= */
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const token = generateToken(user);

  res.json({
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      institution: user.institution,
    },
  });
});

/* ================= UPDATE PROFILE (NO AUTH) ================= */
router.put("/me", async (req, res) => {
  const { email, name, institution } = req.body;

  const user = await User.findOneAndUpdate(
    { email },
    { name, institution },
    { new: true }
  );

  res.json({
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    institution: user.institution,
  });
});

export default router;
