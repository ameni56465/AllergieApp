const User = require("../models/userAuth");
const jwt = require("jsonwebtoken");

// Secret for JWT
const JWT_SECRET = "449f3e0c226309fd7646835b539c28e016ee505a20dbdadc5ddef99ddbfc4ef5";

// User Registration
const registerUser = async (req, res) => {
  const { fullName, email, age, country, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create new user
    const user = await User.create({ fullName, email, age, country, password });
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// User Login
const loginUser = async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    // Find user by fullName or email
    const user = await User.findOne({
      $or: [{ fullName }, { email }],
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Validate password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ token, message: "Login successful" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { registerUser, loginUser };
