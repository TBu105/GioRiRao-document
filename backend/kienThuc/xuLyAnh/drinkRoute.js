const express = require("express");
const router = express.Router();
const uploadDisk = require("multerConfig");
const Drink = require("../models/drink");

router.post("/drinks", uploadDisk.single("image"), async (req, res) => {
  try {
    // 1. Create drink document immediately with basic data
    const drink = new Drink({
      name: req.body.name,
      price: req.body.price,
      imageProcessing: true, // Flag to indicate image is being processed
    });

    await drink.save();

    // 2. Send success response immediately
    res.status(201).json({
      message: "Drink created successfully. Image is being processed.",
      drinkId: drink._id,
    });

    // 3. Process image asynchronously
    if (req.file) {
      processImageAsync(req.file.path, drink._id).catch(console.error);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

async function processImageAsync(imagePath, drinkId) {
  try {
    // Convert to WebP
    const webpPath = await ImageProcessor.convertToWebP(imagePath);

    // Upload to Cloudinary
    const imageUrl = await ImageProcessor.uploadToCloudinary(webpPath);

    // Update drink document with image URL
    await Drink.findByIdAndUpdate(drinkId, {
      imageUrl,
      imageProcessing: false,
    });

    // Optionally: Emit event or notify client through WebSocket
    // socketIO.emit('imageProcessed', { drinkId, imageUrl });
  } catch (error) {
    console.error("Error processing image:", error);
    // Update document to indicate processing failed
    await Drink.findByIdAndUpdate(drinkId, {
      imageProcessing: false,
      imageError: error.message,
    });
  }
}

