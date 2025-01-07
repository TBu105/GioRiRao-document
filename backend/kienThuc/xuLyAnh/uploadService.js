const uploadToCloudinary = async (
  filePath,
  { folderName = "drinks", imgHeight, imgWidth, imgFormat = "webp" }
) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: folderName,
      format: imgFormat,
    });

    const resizeUrl = cloudinary.url(result.public_id, {
      height: Number(imgHeight),
      width: Number(imgWidth),
      crop: "fill", // Ensures the image is resized proportionally
    });

    return { photoUrl: result.secure_url, resizeUrl };
  } finally {
    // Clean up local files
    await fs.unlink(filePath).catch(console.error);
  }
};
