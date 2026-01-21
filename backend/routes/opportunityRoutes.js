import express from "express";
import Opportunity from "../models/Opportunity.js";

const router = express.Router();

// Create opportunity
router.post("/", async (req, res) => {
  const opp = await Opportunity.create(req.body);
  res.json(opp);
});

// Get all opportunities
router.get("/", async (req, res) => {
  const opps = await Opportunity.find();
  res.json(opps);
});

export default router;
