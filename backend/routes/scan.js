
const express = require("express");
const { getByCodeController, createproduct } = require("../controllers/scan");

const router = express.Router();

router.get("/product/:code", getByCodeController);
router.post("/add", createproduct);

module.exports = router;

