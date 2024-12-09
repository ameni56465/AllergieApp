const express = require("express");
const {
  getAllAllergies,
  getAllergyById,
  createAllergy,
  updateAllergy,
  deleteAllergy,
} = require("../controllers/allergyController");

const router = express.Router();

// Routes for allergy management
router.get("/getAllAllergies", getAllAllergies); // Get all allergies
router.get("/:id", getAllergyById); // Get allergy by ID
router.post("/create", createAllergy); // Create new allergy
router.put("/:id", updateAllergy); // Update allergy by ID
router.delete("/:id", deleteAllergy); // Delete allergy by ID

module.exports = router;