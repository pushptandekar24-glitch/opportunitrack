import mongoose from "mongoose";

const opportunitySchema = new mongoose.Schema({
  title: String,
  company: String,
  category: {
    type: String,
    enum: ["internship", "hackathon", "scholarship", "competition", "workshop"],
  },
  deadline: Date,
  location: String,
  skills: [String],
  description: String,
  link: String,
  matchScore: Number,
});

export default mongoose.model("Opportunity", opportunitySchema);
