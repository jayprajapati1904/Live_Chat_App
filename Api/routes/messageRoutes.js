// Import required modules using ES module syntax
import express from "express";
import {
  getUsersForSiderbar,
  getMessage,
  sendMessage,
} from "../controllers/messageController.js";
import { protect } from "../middlewares/authMiddleware.js";

// Create a router instance
const router = express.Router();

router.get("/users", protect, getUsersForSiderbar);
router.get("/:id", protect, getMessage);
router.post("/send/:id", protect, sendMessage);

export default router;
