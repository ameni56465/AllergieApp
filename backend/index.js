const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/userAuth");

const app = express();
const port = 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Database connection
mongoose
  .connect("mongodb://localhost:27017/allergie")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));


// Routes
app.use("/api/users", userRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

