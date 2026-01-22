import express from "express";
import Event from "../models/Event.js";
import { protect, adminOnly } from "../middleware/authmiddleware.js";

/* CREATE EVENT → ADMIN ONLY */



const router = express.Router();
router.post("/", protect, adminOnly, async (req, res) => {
  const event = await Event.create(req.body);
  res.json(event);
});
router.get("/:id", async (req, res) => {
  const event = await Event.findById(req.params.id);
  res.json(event);
});


// CREATE
router.post("/", async (req, res) => {
  const event = await Event.create(req.body);
  res.json(event);
});

// READ
router.get("/", async (req, res) => {
  const events = await Event.find().sort({ createdAt: -1 });
  res.json(events);
});

// UPDATE
router.put("/:id", async (req, res) => {
  const updated = await Event.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updated);
});

// DELETE
router.delete("/:id", async (req, res) => {
  await Event.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

export default router;
