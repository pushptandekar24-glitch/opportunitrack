import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import opportunityRoutes from "./routes/opportunityRoutes.js";

dotenv.config();

const app = express(); 
app.use(cors());
app.use(express.json());

const PORT = 5000;

async function startServer() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected");

    // routes AFTER app initialization
    app.get("/", (req, res) => {
      res.send("API running");
    });

    app.use("/api/auth", authRoutes);
    app.use("/api/opportunities", opportunityRoutes);

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1);
  }
}

startServer();
