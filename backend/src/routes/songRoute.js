import {
  addSong,
  listSong,
  removeSong,
} from "../controllers/songController.js";
import express from "express";
import multer from "multer"; // Import multer directly
import upload from "../middleware/multer.js"; // assuming this is your multer config

const songRouter = express.Router();

// Setup the multer fields handling correctly
const uploadFields = upload.fields([
  { name: "image", maxCount: 1 },
  { name: "audio", maxCount: 1 },
]);

songRouter.post("/add", uploadFields, addSong);
songRouter.get("/list", listSong);
songRouter.post("/remove", removeSong);

export default songRouter;
