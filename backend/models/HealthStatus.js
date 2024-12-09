const mongoose = require("mongoose");

const healthStatusSchema = new mongoose.Schema(
  {
    currentHealth: { type: String, required: true },
    recentSymptoms: { type: String, required: true },
    lastReaction: { type: String, required: true },
    emergencyAlert: { type: Boolean, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("HealthStatus", healthStatusSchema);
