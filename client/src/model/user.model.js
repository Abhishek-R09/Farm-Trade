const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  status: {
    type: String,
    enum: ["Pending", "Active"],
    default: "Pending",
  },
  confirmationCode: {
    type: String,
    unique: true,
  },
  roles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
    },
  ],
  firstname: String,
  lastname: String,
  rating: Number,
  auctionsParticipated: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auction",
    },
  ],
})

module.exports = mongoose.models.User || mongoose.model("User", UserSchema);
