const express = require('express');
const router = express.Router();
const{ getAllSymptoms, createSymptom, updateSymptom, deleteSymptom } = require('../controllers/symptom');

router.post('/add', createSymptom);
router.get('/getall', getAllSymptoms);
router.put('/edit/:id', updateSymptom);
router.delete('/delete/:id', deleteSymptom);

module.exports = router;