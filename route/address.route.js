import express from "express";
import {
  addAddress,
  getAddresses,
  updateAddress,
  deleteAddress,
} from "../controller/address.controller.js"; // check folder name spelling
import { protect } from "../middleware/Auth.js";

const router = express.Router();

// Add new address
router.post("/add", protect, addAddress);

// Get all addresses of a user
router.get("/get", protect, getAddresses);

// Update an address
router.put("/update/:id", protect, updateAddress);

// Delete an address
router.delete("/delete/:id", protect, deleteAddress);

export default router;
