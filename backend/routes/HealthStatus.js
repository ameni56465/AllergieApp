const express = require("express");
const router = express.Router();
const healthStatusController = require("../controllers/HealthStatus");

// Récupérer tous les états de santé
router.get("/", healthStatusController.getAllHealthStatuses);

// Récupérer un état de santé spécifique
router.get("/:id", healthStatusController.getHealthStatusById);

// Créer un nouvel état de santé
router.post("/", healthStatusController.createHealthStatus);

// Mettre à jour un état de santé
router.put("/:id", healthStatusController.updateHealthStatus);

// Supprimer un état de santé
router.delete("/:id", healthStatusController.deleteHealthStatus);

module.exports = router;
