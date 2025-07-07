import express from "express";
import {
  createContact,
  getAllContacts,
} from "../controller/contact.controller.js";

const router = express.Router();

router.post("/add", createContact);
router.get("/get", getAllContacts);

export default router;
