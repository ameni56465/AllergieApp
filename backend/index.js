const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/userAuth");
const symptomRoutes = require("./routes/symptom");

const healthStatusRoutes = require("./routes/HealthStatus");


const allergyRoutes = require("./routes/allergyRoutes");

const app = express();
const port = 8000;

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
app.use("/api/symptoms", symptomRoutes);

app.use("/health-status", healthStatusRoutes);

app.use("/api/allergies", allergyRoutes);


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

