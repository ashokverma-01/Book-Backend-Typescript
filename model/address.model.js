import mongoose from "mongoose";

// Address Schema
const addressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  bio: { type: String, required: true },
  phone: { type: String, required: true },
  streetAddress: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  postalCode: { type: String, required: true },
  country: { type: String, required: true },
  isDefault: { type: Boolean, default: false },
  label: {
    type: String,
    enum: ["Home", "Work", "Other"],
    default: "Home",
  },
});

const Address = mongoose.model("Address", addressSchema);

export default Address;
