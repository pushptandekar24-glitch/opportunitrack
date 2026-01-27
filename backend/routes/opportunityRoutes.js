import express from "express";
import Opportunity from "../models/Opportunity.js";

const router = express.Router();

// GET all opportunities (with optional category)
router.get("/", async (req, res) => {
  try {
    const { category } = req.query;

    const filter = category && category !== "all"
      ? { category }
      : {};

    const opportunities = await Opportunity.find(filter).sort({ deadline: 1 });

    res.json(opportunities);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST (for admin / seed)
router.post("/", async (req, res) => {
  try {
    const opportunity = new Opportunity(req.body);
    const saved = await opportunity.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
