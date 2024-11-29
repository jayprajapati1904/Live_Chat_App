// Import required modules using ES module syntax
import express from "express";
import {
  signup,
  signin,
  signout,
  updateProfile,
  checkAuth,
} from "../controllers/authController.js";
import { protect } from "../middlewares/authMiddleware.js";

// Create a router instance
const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/logout", signout);

router.put("/update-profile", protect, updateProfile);

router.get("/check", protect, checkAuth);
export default router;
