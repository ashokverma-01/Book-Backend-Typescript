import Book from "../model/book.model.js";
import { deleteImage } from "../config/Cloudinary.js";

// Create Book
export const createBook = async (req, res) => {
  try {
    const { name, price, category, title } = req.body;
    const imageUrl = req.file?.path;
    const imageId = req.file?.filename;

    const newBook = new Book({
      name,
      price,
      category,
      title,
      imageUrl,
      imageId,
    });

    await newBook.save();
    res
      .status(201)
      .json({ message: "Book created successfully", book: newBook });
  } catch (error) {
    res.status(400).json({ message: "Error creating book", error });
  }
};

// Get Books
export const getBook = async (req, res) => {
  try {
    const book = await Book.find();
    res.status(200).json(book);
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json(error);
  }
};

// Delete Book
export const deleteBook = async (req, res) => {
  try {
    const { id } = req.params; // Get the book id from the URL

    const book = await Book.findById(id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    // If the book has an image, delete it from Cloudinary
    if (book.imageId) {
      const result = await deleteImage(book.imageId);
      if (result.result !== "ok") {
        return res
          .status(500)
          .json({ message: "Error deleting image from Cloudinary" });
      }
    }

    // Delete the book from the database
    await Book.findByIdAndDelete(id);

    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Error deleting book", error });
  }
};

export const updateBook = async (req, res) => {
  try {
    const { name, price, category, title } = req.body;
    const { id } = req.params;
    const imageUrl = req.file?.path;
    const imageId = req.file?.filename;

    // Find the existing book by ID
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    if (book.imageId && imageId && imageId !== book.imageId) {
      const deleteResult = await deleteImage(book.imageId);
      if (deleteResult.result !== "ok") {
        return res
          .status(500)
          .json({ message: "Error deleting old image from Cloudinary" });
      }
    }

    // Update book fields
    book.name = name || book.name;
    book.price = price || book.price;
    book.category = category || book.category;
    book.title = title || book.title;
    if (imageUrl) {
      book.imageUrl = imageUrl;
      book.imageId = imageId;
    }

    // Save the updated book document
    await book.save();

    res.status(200).json({ message: "Book updated successfully", book });
  } catch (error) {
    console.error("Error updating book:", error);
    res
      .status(500)
      .json({ message: "Error updating book", error: error.message });
  }
};
