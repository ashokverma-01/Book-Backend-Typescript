import express from "express";
import multer from "multer";
import { storage } from "../config/Cloudinary.js";
import {
  getBook,
  createBook,
  deleteBook,
  updateBook,
} from "../controller/book.controller.js";
import { protect } from "../middleware/Auth.js";

const upload = multer({ storage });
const router = express.Router();

// Route
router.get("/get", protect, getBook);
router.post("/add", protect, upload.single("image"), createBook);
router.put("/update/:id", protect, upload.single("image"), updateBook);
router.delete("/delete/:id", protect, deleteBook);

export default router;
