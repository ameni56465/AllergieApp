const mongoose = require('mongoose');

const symptomSchema = new mongoose.Schema({
    symptomType: { type: String, required: true },
    severityLevel: { type: String, required: true },
    frequency: { type: String, required: true },
    mainTrigger: { type: String, required: true },
    note: { type: String }
});

module.exports = mongoose.model('Symptom', symptomSchema);