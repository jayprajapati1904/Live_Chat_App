const express = require("express");
const {
  signup,
  signin,
  signout,
  updateProfile,
  checkAuth,
} = require("../controllers/authController.js");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware.js");

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/logout", signout);

router.put("/update-profile", protect, updateProfile);

router.get("/check", protect, checkAuth);

module.exports = router;
