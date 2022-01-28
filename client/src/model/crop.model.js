import mongoose from "mongoose";

const CropSchema = new mongoose.Schema({
  name: String,
  image: String,
  rating: Number,
});

export default mongoose.models.Crop || mongoose.model("Crop", CropSchema);
