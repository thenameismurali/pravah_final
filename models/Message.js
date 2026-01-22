import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    chatId: String,
    senderEmail: String,
    senderName: String, // ✅ ADD THIS
    text: String,
  },
  { timestamps: true }
);

export default mongoose.model("Message", messageSchema);
