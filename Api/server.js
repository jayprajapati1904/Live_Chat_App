// Import required modules using ES module syntax
import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { app, server } from "../Api/config/socket.js";
import path from "path";

dotenv.config();
connectDB();

const __dirname = path.resolve();

// Increase payload size limit
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173", // Allow the frontend's origin
    credentials: true, // Allow cookies/credentials
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

app.use(express.static(path.join(__dirname, "./Client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./Client", "dist", "index.html"));
});

server.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port ${process.env.PORT || 5000}`);
});
