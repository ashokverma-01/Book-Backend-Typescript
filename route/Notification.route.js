import express from "express";
import multer from "multer";
import {
  sendNotification,
  getAllNotifications,
  getUserNotifications,
  markAsRead,
  deleteNotification,
  getUnreadCount,
} from "../controller/Notification.controller.js";
import { storage } from "../config/Cloudinary.js";
import { protect } from "../middleware/Auth.js";

const router = express.Router();
const upload = multer({ storage });

router.post("/send", protect, upload.single("image"), sendNotification);
router.get("/list", protect, getAllNotifications);
router.get("/get", protect, getUserNotifications);
router.put("/read/:id", protect, markAsRead);
router.delete("/delete/:id", protect, deleteNotification);
router.get("/unread", protect, getUnreadCount);

export default router;
