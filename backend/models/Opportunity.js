import mongoose from "mongoose";

const opportunitySchema = new mongoose.Schema({
  title: String,
  category: String,
  description: String,
  skillsRequired: [String],
  deadline: Date,
  link: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Opportunity", opportunitySchema);
