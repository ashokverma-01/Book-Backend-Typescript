// model/UserToken.js
import mongoose from "mongoose";

const userTokenSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  fcmToken: { type: String, required: true },
  lastUpdated: { type: Date, default: Date.now },
});

userTokenSchema.index({ userId: 1 }, { unique: true });

export default mongoose.model("UserToken", userTokenSchema);
