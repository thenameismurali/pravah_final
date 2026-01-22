import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: String,
    date: String,
    venue: String,
    description: String,
    location: String,
    chatId: String,
  },
  { timestamps: true }
);

export default mongoose.model("Event", eventSchema);
