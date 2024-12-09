const mongoose = require("mongoose");

const allergySchema = new mongoose.Schema({
  date: { type: Date, required: true },
  category: { type: String, required: true },
  allergen: { type: String, required: true },
  crossAllergy: { type: String }, // Optional field
  severity: { type: String, required: true, enum: ["Low", "Medium", "High"] },
});

module.exports = mongoose.model("Allergy", allergySchema);