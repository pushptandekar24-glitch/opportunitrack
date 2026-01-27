import Opportunity from "../models/Opportunity.js";

export const getOpportunities = async (req, res) => {
  try {
    const { category } = req.query;

    const filter = category ? { category } : {};
    const opportunities = await Opportunity.find(filter).sort({ deadline: 1 });

    res.json(opportunities);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch opportunities" });
  }
};
    