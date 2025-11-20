const express = require("express");
const router = express.Router();
const PG = require("../models/PG.js");

// Create PG (later you can protect this with auth)
router.post("/", async (req, res) => {
  try {
    const pg = await PG.create(req.body);
    res.status(201).json(pg);
  } catch (err) {
    res.status(500).json({ message: "Error creating PG", error: err.message });
  }
});

// Get all PGs with filters
router.get("/", async (req, res) => {
  try {
    const { collegeId, gender, maxPrice } = req.query;
    const filter = {};

    if (collegeId) filter.college = collegeId;
    if (gender) filter.gender = gender;
    if (maxPrice) filter.pricePerMonth = { $lte: Number(maxPrice) };

    const pgs = await PG.find(filter).populate("college");
    res.json(pgs);
  } catch (err) {
    res.status(500).json({ message: "Error fetching PGs", error: err.message });
  }
});

// Get PG by ID
router.get("/:id", async (req, res) => {
  try {
    const pg = await PG.findById(req.params.id).populate("college");
    if (!pg) return res.status(404).json({ message: "PG not found" });
    res.json(pg);
  } catch (err) {
    res.status(500).json({ message: "Error fetching PG", error: err.message });
  }
});

module.exports = router;
