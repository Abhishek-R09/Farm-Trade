const mongoose = require("mongoose");

const RoleSchema = new mongoose.Schema({
  name: String,
})

module.exports = mongoose.models.Role || mongoose.model("Role", RoleSchema);
