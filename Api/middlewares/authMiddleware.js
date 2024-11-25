const jwt = require("jsonwebtoken");
const User = require("../models/User.js");

const protect = async (req, res, next) => {
  const token = req.cookies.jwt;
  console.log(token);
  if (!token)
    return res.status(401).json({ error: "No token, authorization denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      res.status(401).json({ message: "Invalid token, authorization denied" });
    }
    const user = await User.findById(decoded.id).select("-password");

    console.log(user);
    if (!user) {
      res.status(401).json({ message: "user not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = { protect };
