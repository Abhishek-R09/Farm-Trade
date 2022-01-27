import mongoose from "mongoose";

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

export default mongoose.models.Farmer || mongoose.model("Farmer", FarmerSchema);