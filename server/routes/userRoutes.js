// server/routes/userRoutes.js
import express from "express";
import { authUser, getAllUsers } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js"; // We will create this middleware

const router = express.Router();

router.post("/auth", authUser);
router.get("/", protect, getAllUsers); // Add this line, protected route

export default router;
