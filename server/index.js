// server/index.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js"; // Import user routes

// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

// Initialize the express app
const app = express();
const PORT = process.env.PORT || 8000;

// Middleware setup
app.use(cors());
app.use(express.json());

// --- API Routes ---
app.use("/api/users", userRoutes); // Use user routes

// A simple test route
app.get("/", (req, res) => {
  res.status(200).json({ message: "Chat App Server is running!" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
