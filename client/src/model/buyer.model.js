const mongoose = require("mongoose");

const BuyerSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  pastPurchase: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auction",
    },
  ],
})

module.exports = mongoose.models?.Buyer || mongoose.model("Buyer", BuyerSchema);

// module.exports = Buyer;
