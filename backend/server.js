import express from "express";
import cors from "cors";
import "dotenv/config";
import songRouter from "./src/routes/songRoute.js";
import connectDB from "./src/config/mongodb.js";
import connectCloudinary from "./src/config/cloudinary.js";
import albumRouter from "./src/routes/albumRoute.js";

// app config especially database connection.
const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();

// middlewares
app.use(express.json()); // after getting any request, this json parse that request.
app.use(cors()); // this method connects frontend to the bacckend.

// initializing routes
app.use("/api/song", songRouter); // base route for songRoute.js
app.use("/api/album", albumRouter); // base route fro albumRoute.js
app.get("/", (req, res) => res.send("API Working"));
app.listen(port, () => console.log(`Server is runing on ${port}`));
