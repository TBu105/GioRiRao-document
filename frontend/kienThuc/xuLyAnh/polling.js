/**
 * Ví dụ, Drink có schema như sau:
 * const drinkSchema = new mongoose.Schema({
  name: String,
  price: Number,
  imageUrl: String,
  imageProcessing: { type: Boolean, default: false }
});
 */

// Client side
function checkImageStatus(drinkId) {
  const interval = setInterval(async () => {
    const response = await fetch(`/drinks/${drinkId}`);
    const drink = await response.json();

    if (!drink.imageProcessing) {
      clearInterval(interval);
      // 1 hàm thông báo cho khách hàng rằng ảnh đã được xử lý được gọi ở đây
      if (drink.imageUrl) {
        // Show success message
        showNotification("Image uploaded successfully!");
        // Update UI with new image
        document.getElementById("drinkImage").src = drink.imageUrl;
      }
    }
  }, 2000); // Check every 2 seconds
}
