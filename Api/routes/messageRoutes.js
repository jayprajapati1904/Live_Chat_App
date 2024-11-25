const express = require("express");
const {
  getUsersForSiderbar,
  getMessage,
  sendMessage,
} = require("../controllers/messageController.js");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware.js");

router.post("/users", protect, getUsersForSiderbar);
router.get("/:id", protect, getMessage);
router.post("/send/:id", protect, sendMessage);

module.exports = router;
