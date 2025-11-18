const express = require("express");
const router = express.Router();
const College = require("../models/college.js");

// Create college (use Postman to add some initial data)
router.post("/", async (req, res) => {
  try {
    const college = await College.create(req.body);
    res.status(201).json(college);
  } catch (err) {
    res.status(500).json({ message: "Error creating college", error: err.message });
  }
});

// Get all colleges
router.get("/", async (req, res) => {
  try {
    const colleges = await College.find();
    res.json(colleges);
  } catch (err) {
    res.status(500).json({ message: "Error fetching colleges", error: err.message });
  }
});

module.exports = router;
