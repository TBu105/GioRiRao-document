import React, { useState } from "react";
import imageCompression from "browser-image-compression";

function ImageUpload() {
  const [image, setImage] = useState(null);

  const handleImageChange = async (event) => {
    const file = event.target.files[0];

    if (file) {
      // Set options for compression (optional)
      const options = {
        maxSizeMB: 1, // Maximum size in MB
        maxWidthOrHeight: 800, // Resize the image (optional)
        useWebWorker: true, // Use a web worker for better performance
      };

      try {
        // Compress the image
        const compressedFile = await imageCompression(file, options);
        setImage(compressedFile);
        uploadImageToServer(compressedFile);
      } catch (error) {
        console.error("Error during image compression", error);
      }
    }
  };

  // Function to upload the compressed image to the backend
  const uploadImageToServer = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      console.log("Image uploaded successfully:", result);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      {image && <img src={URL.createObjectURL(image)} alt="Preview" />}
    </div>
  );
}

export default ImageUpload;
