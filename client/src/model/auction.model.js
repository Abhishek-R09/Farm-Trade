const mongoose = require("mongoose");

const AuctionSchema =
  new mongoose.Schema({
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
  })

module.exports = mongoose.models.Auction || mongoose.model("Role", AuctionSchema);

// module.exports = Auction;
