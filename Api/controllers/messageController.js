// Import required modules using ES module syntax
import User from "../models/User.js";
import Message from "../models/Message.js";
import cloudinary from "../config/cloudinary.js";
import { getReceiverSocketId, io } from "../config/socket.js";



export const getUsersForSiderbar = async (req, res) => {
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

export const getMessage = async (req, res) => {
  try {
    const { id: reciver } = req.params;
    // console.log(reciver);
    const myId = req.user._id;
    // console.log(myId);

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

export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: reciver } = await req.params;
    const myId = req.user._id;

    let imageurl;
    if (image) {
      const uploadimage = await cloudinary.uploader.upload(image);
      imageurl = uploadimage.secure_url;
    }

    const newMessage = new Message({
      senderId: myId,
      receiverId: reciver,
      text,
      image: imageurl,
    });

    await newMessage.save();

    const receiverSocketId = getReceiverSocketId(reciver);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(200).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
