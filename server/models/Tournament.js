const mongoose = require("mongoose");

const TournamentSchema = new mongoose.Schema({
  name: { type: String },
  elimNumber: { type: Number },
  partialElimNumber: { type: Number },
  partialFraction: { type: String },
  prelimNumber: { type: Number },
  dates: { type: String },
});

module.exports = mongoose.model("Tournament", TournamentSchema);
