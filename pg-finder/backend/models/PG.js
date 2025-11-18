const mongoose = require("mongoose");

const pgSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    gender: { type: String, enum: ["boys", "girls", "unisex"], required: true },
    distanceFromCollegeKm: Number,
    pricePerMonth: Number,
    facilities: [String], // e.g. ["WiFi", "Food", "Laundry"]
    images: [String], // image URLs if you add later
    college: { type: mongoose.Schema.Types.ObjectId, ref: "College", required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("PG", pgSchema);
