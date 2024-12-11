const HealthStatus = require("../models/HealthStatus");

// Récupérer tous les états de santé
exports.getAllHealthStatuses = async (req, res) => {
  try {
    const statuses = await HealthStatus.find();
    res.status(200).json(statuses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching health statuses", error });
  }
};

// Récupérer un état de santé spécifique
exports.getHealthStatusById = async (req, res) => {
  try {
    const status = await HealthStatus.findById(req.params.id);
    if (!status) return res.status(404).json({ message: "Health status not found" });
    res.status(200).json(status);
  } catch (error) {
    res.status(500).json({ message: "Error fetching health status", error });
  }
};

// Créer un nouvel état de santé
exports.createHealthStatus = async (req, res) => {
  try {
    const { currentHealth, recentSymptoms, lastReaction, emergencyAlert } = req.body;
    const newStatus = new HealthStatus({
      currentHealth,
      recentSymptoms,
      lastReaction,
      emergencyAlert,
    });
    const savedStatus = await newStatus.save();
    res.status(201).json(savedStatus);
  } catch (error) {
    res.status(400).json({ message: "Error creating health status", error });
  }
};

// Mettre à jour un état de santé
exports.updateHealthStatus = async (req, res) => {
  try {
    const { currentHealth, recentSymptoms, lastReaction, emergencyAlert } = req.body;
    const updatedStatus = await HealthStatus.findByIdAndUpdate(
      req.params.id,
      { currentHealth, recentSymptoms, lastReaction, emergencyAlert },
      { new: true }
    );
    if (!updatedStatus) return res.status(404).json({ message: "Health status not found" });
    res.status(200).json(updatedStatus);
  } catch (error) {
    res.status(400).json({ message: "Error updating health status", error });
  }
};

// Supprimer un état de santé
exports.deleteHealthStatus = async (req, res) => {
  try {
    const deletedStatus = await HealthStatus.findByIdAndDelete(req.params.id);
    if (!deletedStatus) return res.status(404).json({ message: "Health status not found" });
    res.status(200).json({ message: "Health status deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting health status", error });
  }
};


