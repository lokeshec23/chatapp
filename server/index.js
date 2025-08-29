// server/index.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createServer } from "http"; // Import http
import { Server } from "socket.io"; // Import socket.io
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import messageRoutes from "./routes/messageRoutes.js"; // We will create this

// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

// Initialize the express app
const app = express();
const httpServer = createServer(app); // Create HTTP server
const io = new Server(httpServer, {
  // Attach socket.io to the server
  cors: {
    origin: "http://localhost:3000", // Allow requests from your React client
    methods: ["GET", "POST"],
  },
});

const PORT = process.env.PORT || 8000;

// Middleware setup
app.use(cors());
app.use(express.json());

// --- API Routes ---
app.use("/api/users", userRoutes);
app.use("/api/messages", messageRoutes); // Add message routes

// A simple test route
app.get("/", (req, res) => {
  res.status(200).json({ message: "Chat App Server is running!" });
});

// --- Socket.io Connection ---
io.on("connection", (socket) => {
  console.log("🔌 A user connected:", socket.id);

  // Setup a personal room for the user
  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
    console.log(`User ${userData.name} joined room: ${userData._id}`);
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User joined Room: " + room);
  });

  // Listen for new messages
  socket.on("new message", (newMessage) => {
    const chat = newMessage.chat;

    if (!chat.users) return console.log("Chat.users not defined");

    // Emit the message to all users in the chat room except the sender
    chat.users.forEach((user) => {
      if (user._id === newMessage.sender._id) return;
      socket.in(user._id).emit("message received", newMessage);
    });
  });

  socket.on("disconnect", () => {
    console.log("🔥 A user disconnected:", socket.id);
  });
});

// Start the server
httpServer.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
