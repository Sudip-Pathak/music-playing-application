import express from "express";
import cors from "cors";
import "dotenv/config";
import songRouter from "./src/routes/songRoute.js";
import connectDB from "./src/config/mongodb.js";
import connectCloudinary from "./src/config/cloudinary.js";

// app config
const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();

// middlewares
app.use(express.json()); // after getting any request, this json parse that request.
app.use(cors()); // this method connects frontend to the bacckend.

// initializing routes
app.use("/api/song", songRouter); // if we need the list of all songs, we go through this api path
app.get("/", (req, res) => res.send("API Working"));
app.listen(port, () => console.log(`Server is runing on ${port}`));
  // 