import Address from "../model/address.model.js";

// Add a new address
export const addAddress = async (req, res) => {
  try {
    const { userId } = req.body;
    const newAddress = req.body;

    if (newAddress.isDefault) {
      await Address.updateMany(
        { userId: userId },
        { $set: { isDefault: false } }
      );
    }

    const address = new Address({ ...newAddress, userId });
    await address.save();

    res.status(200).json({ message: "Address added successfully", address });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to add address", error: error.message });
  }
};

// Get all addresses of a user
export const getAddresses = async (req, res) => {
  try {
    const userId = req.user._id;

    if (!userId) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const addresses = await Address.find({ userId });

    if (!addresses || addresses.length === 0) {
      return res.status(404).json({ message: "No addresses found" });
    }

    res
      .status(200)
      .json({ message: "Addresses fetched successfully", addresses });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch addresses", error: error.message });
  }
};

// Update an address by its ID
export const updateAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    // Fetch the address by ID
    const address = await Address.findById(id);
    if (!address) return res.status(404).json({ message: "Address not found" });

    // Check if the logged-in user owns the address
    if (address.userId.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this address" });
    }

    if (updatedData.isDefault) {
      await Address.updateMany(
        { userId: address.userId, _id: { $ne: id } },
        { $set: { isDefault: false } }
      );
    }

    Object.assign(address, updatedData);
    await address.save();

    res.status(200).json({ message: "Address updated successfully", address });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to update address", error: error.message });
  }
};

// Delete an address by ID
export const deleteAddress = async (req, res) => {
  try {
    const { id } = req.params;

    const address = await Address.findById(id);
    if (!address) return res.status(404).json({ message: "Address not found" });

    await Address.findByIdAndDelete(id);

    res.status(200).json({ message: "Address deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete address", error: error.message });
  }
};
