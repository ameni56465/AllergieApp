const express = require("express");
const { registerUser, loginUser, getUser, updateUser } = require("../controllers/userAuth");

const router = express.Router();

// User routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/:email", getUser);
router.put("/:email", updateUser);
module.exports = router;