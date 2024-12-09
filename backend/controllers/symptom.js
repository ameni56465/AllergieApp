const Symptom = require("../models/Symptom");


const createSymptom = async (req, res) => {
  const { symptomType, severityLevel, frequency, mainTrigger, note } = req.body;

  try {
    const newSymptom = await Symptom.create({
      symptomType,
      severityLevel,
      frequency,
      mainTrigger,
      note,
    });
    res.status(201).json({ message: "Symptom created successfully", symptom: newSymptom });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


const getAllSymptoms = async (req, res) => {
  try {
    const symptoms = await Symptom.find();
    res.status(200).json(symptoms);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


const updateSymptom = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const updatedSymptom = await Symptom.findByIdAndUpdate(id, updates, { new: true });
    if (!updatedSymptom) {
      return res.status(404).json({ message: "Symptom not found" });
    }
    res.status(200).json({ message: "Symptom updated successfully", symptom: updatedSymptom });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


const deleteSymptom = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedSymptom = await Symptom.findByIdAndDelete(id);
    if (!deletedSymptom) {
      return res.status(404).json({ message: "Symptom not found" });
    }
    res.status(200).json({ message: "Symptom deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  createSymptom,
  getAllSymptoms,
  updateSymptom,
  deleteSymptom,
};