import Contact from "../model/contact.model.js";

export const createContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newContact = new Contact({ name, email, message });
    await newContact.save();

    res.status(201).json({
      message: "Contact form submitted successfully",
      contact: newContact,
    });
  } catch (error) {
    console.error("Create Contact Error:", error);
    res
      .status(500)
      .json({ error: "Server error while submitting contact form" });
  }
};

export const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(contacts);
  } catch (error) {
    console.error("Fetch Contacts Error:", error);
    res.status(500).json({ error: "Failed to fetch contact messages" });
  }
};
