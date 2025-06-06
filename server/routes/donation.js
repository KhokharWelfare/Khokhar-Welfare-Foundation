const express = require('express');
const Donation = require('../models/Donation');
const { authMiddleware } = require('../middleware/auth');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const router = express.Router();

// Ensure environment is loaded (optional, if not already done in app.js)
require('dotenv').config();

// Validate Cloudinary configuration
const validateCloudinaryConfig = () => {
  const config = {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  };
  console.log('Cloudinary ENV:', config); // 🔍 Debug vrstica

  if (!config.cloud_name || !config.api_key || !config.api_secret) {
    console.error('Error: Missing Cloudinary environment variables. Check .env');
    throw new Error('Cloudinary configuration missing');
  }
  return config;
};

try {
  cloudinary.config(validateCloudinaryConfig());

  // Test Cloudinary connectivity
  cloudinary.api.ping((error, result) => {
    if (error) {
      console.error('Cloudinary connectivity test failed:', error);
    } else {
      console.log('Cloudinary connected successfully:', result);
    }
  });
} catch (error) {
  console.error('Cloudinary initialization failed:', error);
  process.exit(1); // Exit in development; handle gracefully in production
}

// Multer upload config
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (!file || !allowedTypes.includes(file.mimetype)) {
      return cb(new Error('Only JPEG, PNG, or JPG images are allowed'));
    }
    cb(null, true);
  },
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
}).single('imageString');



router.post('/', upload, authMiddleware, async (req, res) => {
  console.log('Incoming donation request');

  const { name, amount } = req.body;
  console.log('Body:', req.body);
  console.log(' File:', req.file?.originalname, '| size:', req.file?.size);

  if (!name || !name.trim()) {
    return res.status(400).json({ message: 'Please provide a valid name' });
  }

  const parsedAmount = Number(amount);
  if (isNaN(parsedAmount) || parsedAmount <= 0) {
    return res.status(400).json({ message: 'Amount must be a positive number' });
  }

  if (!req.file || !req.file.buffer) {
    console.error(' No file buffer found');
    return res.status(400).json({ message: 'Image is required and must be valid' });
  }

  try {
    console.log('☁️ Uploading to Cloudinary...');

    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: 'donation-proofs' },
        (err, result) => {
          if (err) {
            console.error('Cloudinary error:', err);
            return reject(err);
          }
          resolve(result);
        }
      );
      stream.end(req.file.buffer);
    });

    console.log('Cloudinary upload success:', result.secure_url);

    const donation = new Donation({
      name: name.trim(),
      amount: parsedAmount,
      imageString: result.secure_url,
    });

    await donation.save();
    console.log(' Donation saved:', donation);

    res.status(201).json({ donation });

  } catch (err) {
    console.error(' Donation error:', err);
    res.status(500).json({
      message: 'Failed to process donation',
      error: err.message,
    });
  }
});







module.exports = router;
