import express from "express";
import multer from "multer";
import {
  signup,
  login,
  getProfile,
  getAllUsers,
  updateProfile,
  deleteUser,
  forgetPassword,
  verifyOTP,
  resetPassword,
  logoutUser,
} from "../controller/user.controller.js";
import { storage } from "../config/Cloudinary.js";
import { protect } from "../middleware/Auth.js";

const router = express.Router();
const upload = multer({ storage });

router.post("/signup", signup);
router.post("/login", login);
router.get("/get", protect, getProfile);
router.get("/getAll", protect, getAllUsers);
router.put("/update/:id", protect, upload.single("image"), updateProfile);
router.delete("/delete/:userId", protect, deleteUser);
router.post("/forgot-password", forgetPassword);
router.post("/verify-otp", verifyOTP);
router.post("/reset-password", resetPassword);
router.post("/logout", logoutUser);

export default router;
