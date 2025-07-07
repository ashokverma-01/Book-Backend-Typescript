import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Admin ID
  receiverId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Target User
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: String,
  imageId: String,
  isRead: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Notification", notificationSchema);
