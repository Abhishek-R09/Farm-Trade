const mongoose = require("mongoose");

const CropSchema = new mongoose.Schema({
  name: String,
  image: String,
  rating: Number,
})

module.exports = mongoose.models.Crop || mongoose.model("Crop", CropSchema);
// module.exports = Crop;
