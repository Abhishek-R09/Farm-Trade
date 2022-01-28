import mongoose from "mongoose";

const AuctionSchema = new mongoose.Schema({
  startdate: Number,
  duration: Number,
  harvestdate: Date,
  crop: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Crop",
  },
  quantity: Number,
  tempId: {
    type: String,
    unique: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  description: String,
  startprice: Number,
  bids: [
    {
      bidby: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      bidprice: Number,
      time: Number,
    },
  ],
});

export default mongoose.models.Auction ||
  mongoose.model("Auction", AuctionSchema);

// module.exports = Auction;
