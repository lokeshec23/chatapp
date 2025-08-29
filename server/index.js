// server/index.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js"; // Import the db connection function

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

// A simple test route
app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello from the Chat App Server!" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
