import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "Book",
    format: async (req, file) => "png", // optional
    public_id: (req, file) => Date.now() + "-" + file.originalname,
  },
});

const deleteImage = async (imageId) => {
  try {
    const result = await cloudinary.uploader.destroy(imageId);
    return result;
  } catch (err) {
    throw err;
  }
};

// ✅ Export properly
export { cloudinary, storage, deleteImage };
