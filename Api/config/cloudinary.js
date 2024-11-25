const { v2: cloudinary } = require("cloudinary"); // Import Cloudinary v2
const { config } = require("dotenv");

config(); // Load environment variables

// Configure Cloudinary with environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

module.exports = cloudinary;
