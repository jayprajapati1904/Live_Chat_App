// Import required modules using ES module syntax
import User from "../models/User.js";
import { generateToken } from "../config/utils.js";
import bcrypt from "bcryptjs";
import cloudinary from "../config/cloudinary.js";

export const signup = async (req, res) => {
  const { name, email, password } = req.body;
  // console.log(name, email, password);

  try {
    if (!name || !email || !password) {
      res.status(400).json({ message: "all fields are required" });
    }

    if (password < 6) {
      res
        .status(400)
        .json({ message: "password must be at least 6 characters" });
    }

    const user = await User.findOne({ email });
    // console.log(user);
    if (user) {
      res.status(400).json({ message: "the email already exists or use" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashpassword,
    });

    // console.log(newUser);
    if (newUser) {
      // generate jwt token here
      generateToken(newUser._id, res);

      // save user in database
      await newUser.save();
      res.status(200).json({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        profilepic: newUser.profilepic,
      });
    } else {
      res.status(400).json({ message: "invalid user data" });
    }
  } catch (error) {
    res.status(400).json({ error: "Error in creating user" });
  }
};

export const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!user || !isPasswordCorrect) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    generateToken(user._id, res);
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      profilepic: user.profilepic,
    });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

export const signout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "user logged out successfully!!" });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { profilepic } = await req.body;

    const userId = req.user._id;

    if (!profilepic) {
      return res.status(404).json({ message: "Profile pic is required" });
    }

    const uploadProfilePic = await cloudinary.uploader.upload(profilepic);
    const updateUser = await User.findByIdAndUpdate(
      userId,
      { profilepic: uploadProfilePic.secure_url },
      { new: true }
    );

    res.status(200).json({ updateUser });
  } catch (error) {
    res.status(400).json({ message: "Internal server error" });
  }
};

export const checkAuth = (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" }); // Use return to stop further execution
    }
    res.status(200).json(req.user);
  } catch (error) {
    res.status(400).json({ message: "Internal server error" });
  }
};
