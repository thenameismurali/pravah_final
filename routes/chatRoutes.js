import express from "express";
import ChatGroup from "../models/ChatGroup.js";
import Message from "../models/Message.js";
import User from "../models/User.js"; // ✅ REQUIRED

const router = express.Router();

/* ================= CREATE GROUP ================= */
/* (Admin via event form) */
router.post("/create", async (req, res) => {
  const { chatId, name } = req.body;

  const group = await ChatGroup.create({
    chatId,
    name,
    members: [],
  });

  res.json(group);
});

/* ================= JOIN GROUP ================= */
router.post("/join", async (req, res) => {
  const { chatId, email } = req.body;

  let group = await ChatGroup.findOne({ chatId });

  // If group does not exist → create it
  if (!group) {
    group = await ChatGroup.create({
      chatId,
      name: chatId,
      members: [],
    });
  }

  // Add member safely
  if (!group.members.includes(email)) {
    group.members.push(email);
    await group.save();
  }

  res.json(group);
});

/* ================= GET ALL GROUPS ================= */
router.get("/groups", async (req, res) => {
  const groups = await ChatGroup.find();
  res.json(groups);
});

/* ================= GET USER GROUPS ================= */
router.get("/groups/:email", async (req, res) => {
  const groups = await ChatGroup.find({
    members: req.params.email,
  });
  res.json(groups);
});

/* ================= GET MESSAGES ================= */
router.get("/messages/:chatId", async (req, res) => {
  const messages = await Message.find({ chatId: req.params.chatId }).sort({
    createdAt: 1,
  });
  res.json(messages);
});

/* ================= SEND MESSAGE ================= */
router.post("/send", async (req, res) => {
  const { chatId, text, email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const message = await Message.create({
    chatId,
    senderEmail: user.email,
    senderName: user.name, // ✅ FROM SIGNUP
    text,
  });

  res.json(message);
});

export default router;
