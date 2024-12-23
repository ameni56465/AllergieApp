const Allergy = require("../models/allergyModel");

// Get all allergies
exports.getAllAllergies = async (req, res) => {
  try {
    const allergies = await Allergy.find();
    res.status(200).json(allergies);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch allergies", error: err.message });
  }
};

// Get a single allergy by ID
exports.getAllergyById = async (req, res) => {
  try {
    const allergy = await Allergy.findById(req.params.id);
    if (!allergy) return res.status(404).json({ message: "Allergy not found" });
    res.status(200).json(allergy);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch allergy", error: err.message });
  }
};

// Create a new allergy
exports.createAllergy = async (req, res) => {
  const { date, category, allergen, crossAllergy, severity } = req.body;
  try {
    const allergy = new Allergy({ date, category, allergen, crossAllergy, severity });
    await allergy.save();
    res.status(201).json({ message: "Allergy created successfully", allergy });
  } catch (err) {
    res.status(400).json({ message: "Failed to create allergy", error: err.message });
  }
};

// Update an allergy by ID
exports.updateAllergy = async (req, res) => {
  try {
    const updatedAllergy = await Allergy.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedAllergy) return res.status(404).json({ message: "Allergy not found" });
    res.status(200).json({ message: "Allergy updated successfully", updatedAllergy });
  } catch (err) {
    res.status(400).json({ message: "Failed to update allergy", error: err.message });
  }
};

// Delete an allergy by ID
exports.deleteAllergy = async (req, res) => {
  try {
    const deletedAllergy = await Allergy.findByIdAndDelete(req.params.id);
    if (!deletedAllergy) return res.status(404).json({ message: "Allergy not found" });
    res.status(200).json({ message: "Allergy deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete allergy", error: err.message });
  }
};