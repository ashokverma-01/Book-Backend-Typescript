import mongoose from "mongoose";

// OTP Schema
const otpSchema = new mongoose.Schema(
  {
    otp: {
      type: Number,
      required: false,
    },
    token: {
      type: String,
      required: false,
    },
    sendTime: {
      type: Number, // Store as timestamp
      required: false,
    },
  },
  { _id: false } // Prevent creating an _id for the nested otp schema
);

// User Schema
const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  imageUrl: String,
  imageId: String,
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
  otp: otpSchema, // Referencing the otpSchema here
});

// Create and export the User model
const User = mongoose.model("User", userSchema);

export default User;
