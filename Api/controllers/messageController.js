const User = require("../models/User.js");
const Message = require("../models/Message.js");
const mongoos = require("mongoose");

exports.getUsersForSiderbar = async (req, res) => {
  try {
    const getloggedinuser = req.user._id;
    const fillteredUser = await User.find({
      _id: { $ne: getloggedinuser },
    }).select("-password");

    res.status(200).json(fillteredUser);
  } catch (error) {
    res.status(500).json({ Message: "Error getting users" });
  }
};

exports.getMessage = async (req, res) => {
  try {
    const { id: reciver } = req.params;
    const myId = req.user._id;

    const message = await Message.find({
      $or: [
        {
          senderId: myId,
          receiverId: reciver,
        },
        {
          senderId: reciver,
          receiverId: myId,
        },
      ],
    });

    res.status(200).json(message);
  } catch (error) {
    console.log("Error in getMessages controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: reciver } = await req.params;
    const myId = req.user._id;

    let imageurl;
    if (image) {
      const uploadimage = await cloudinary.uploader.upload(profilepic);
      imageurl = uploadimage.secure_url;
    }

    const newMessage = new Message({
      senderId: myId,
      receiverId: reciver,
      text,
      image: imageurl,
    });

    await newMessage.save();

    res.status(200).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
