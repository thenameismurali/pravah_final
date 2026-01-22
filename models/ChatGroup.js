import mongoose from "mongoose";

const chatGroupSchema = new mongoose.Schema(
  {
    chatId: { type: String, unique: true },
    name: String,
    members: [{ type: String }], // user emails
  },
  { timestamps: true }
);

export default mongoose.model("ChatGroup", chatGroupSchema);
