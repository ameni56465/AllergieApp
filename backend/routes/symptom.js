const express = require('express');
const router = express.Router();
const{ getAllSymptoms, createSymptom, updateSymptom, deleteSymptom } = require('../controllers/symptom');

router.post('/', createSymptom);
router.get('/', getAllSymptoms);
router.put('/:id', updateSymptom);
router.delete('/:id', deleteSymptom);

module.exports = router;