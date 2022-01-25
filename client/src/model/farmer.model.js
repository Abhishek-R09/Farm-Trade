const mongoose = require("mongoose");

const FarmerSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  crops: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Crop",
    },
  ],
})

module.exports = mongoose.models.Farmer || mongoose.model("Farmer", FarmerSchema);

// module.exports = Farmer;
