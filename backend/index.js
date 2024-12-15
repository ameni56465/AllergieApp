const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/userAuth");
const healthStatusRoutes = require("./routes/HealthStatus");
const articleRoutes = require("./routes/Article");


const app = express();
const port = 8000;

// Middleware
app.use(express.json());
app.use(cors());

// Database connection
mongoose
  .connect("mongodb+srv://fellyecomproject:TpgsyX6iReNElwvg@cluster0.2xspppw.mongodb.net/PMIProject?retryWrites=true&w=majority")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));


// Routes
app.use("/api/users", userRoutes);
app.use("/health-status", healthStatusRoutes);
app.use("/api/articles", articleRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

