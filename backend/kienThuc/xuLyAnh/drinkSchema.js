const drinkSchema = new mongoose.Schema({
  name: String,
  price: Number,
  imageUrl: String,
  imageProcessing: { type: Boolean, default: false },
  status: {
    type: String,
    enum: ["pending", "completed", "failed"],
    default: "pending",
  },
  imageError: String,
});