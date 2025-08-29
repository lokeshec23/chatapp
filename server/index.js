// index.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Initialize the express app
const app = express();
const PORT = process.env.PORT || 8000;

// Middleware setup
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Enable the express app to parse JSON formatted request bodies

// A simple test route
app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello from the Chat App Server!" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
