const mongoose = require("mongoose");

const TeamSchema = new mongoose.Schema({
  school: { type: String },
  s1FirstName: { type: String },
  s1LastName: { type: String },
  s2FirstName: { type: String },
  s2LastName: { type: String },
  bidAccepted: { type: Boolean, required: true, default: false },
  tournaments: { type: Array },
  wins: { type: Number, required: true, default: 0 },
  losses: { type: Number, required: true, default: 0 },
  points: { type: Number, required: true, default: 0 },
});

module.exports = mongoose.model("Team", TeamSchema);
