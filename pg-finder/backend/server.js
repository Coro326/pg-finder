const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Simple test route
app.get("/", (req, res) => {
  res.send("PG Finder Backend Running");
});

// Import routes (we will create later)
const authRoutes = require("./routes/authRoutes");
const pgRoutes = require("./routes/pgRoutes");
const collegeRoutes = require("./routes/collegeRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/pgs", pgRoutes);
app.use("/api/colleges", collegeRoutes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  })
  .catch((err) => console.log("DB Error:", err));
