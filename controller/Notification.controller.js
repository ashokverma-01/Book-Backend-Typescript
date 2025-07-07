import Notification from "../model/Notification.js";
import UserToken from "../model/UserToken.js";
import admin from "../utils/Firebase.js";
import User from "../model/user.model.js";
import mongoose from "mongoose";

export const sendNotification = async (req, res) => {
  try {
    // ✅ Check if user is admin
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied: Admins only" });
    }

    const { title, description, userId } = req.body;
    const senderId = req.user.id;
    const imageUrl = req.file?.path;
    const imageId = req.file?.filename;

    // ✅ Check if receiver user exists
    const receiver = await User.findById(userId);
    if (!receiver) {
      return res.status(404).json({ message: "Receiver user not found" });
    }

    // ✅ Notification create
    const notification = new Notification({
      senderId,
      receiverId: receiver._id,
      title,
      description,
      imageUrl,
      imageId,
      isRead: false,
    });

    await notification.save();

    const userToken = await UserToken.findOne({ userId: receiver._id });

    if (userToken && userToken.deviceToken) {
      const message = {
        token: userToken.deviceToken,
        notification: {
          title,
          description,
        },
        data: {
          notificationId: notification._id.toString(),
        },
      };

      await admin.messaging().send(message);
    }

    res
      .status(201)
      .json({ message: "Notification sent to user", notification });
  } catch (error) {
    console.error("Error sending notification:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

export const getAllNotifications = async (req, res) => {
  try {
    // Optional: Only admin can fetch all
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied: Admins only" });
    }

    const notifications = await Notification.find()
      .sort({ createdAt: -1 })
      .populate("receiverId", "firstName lastName")
      .populate("senderId", "firstName lastName");

    res.status(200).json({ notifications });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch notifications", error: err.message });
  }
};

export const getUserNotifications = async (req, res) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(400).json({ message: "User ID not found in request." });
    }

    const notifications = await Notification.find({
      receiverId: new mongoose.Types.ObjectId(userId),
    })
      .sort({ createdAt: -1 })
      .populate("senderId", "firstName lastName");

    if (notifications.length === 0) {
    }

    res.status(200).json({ notifications });
  } catch (err) {
    console.error("Error fetching notifications:", err);
    res
      .status(500)
      .json({ message: "Failed to fetch notifications", error: err.message });
  }
};

export const markAsRead = async (req, res) => {
  const { id } = req.params;

  try {
    const notification = await Notification.findByIdAndUpdate(
      id,
      { isRead: true },
      { new: true }
    );
    if (!notification)
      return res.status(404).json({ message: "Notification not found" });
    res.status(200).json({ message: "Marked as read", notification });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to update notification", error: err.message });
  }
};

export const deleteNotification = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Notification.findByIdAndDelete(id);
    if (!deleted)
      return res.status(404).json({ message: "Notification not found" });
    res.status(200).json({ message: "Notification deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete", error: err.message });
  }
};

export const getUnreadCount = async (req, res) => {
  const userId = req.user.id;

  try {
    const count = await Notification.countDocuments({
      receiverId: userId,
      isRead: false,
    });
    res.status(200).json({ count });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch unread count", error: err.message });
  }
};
