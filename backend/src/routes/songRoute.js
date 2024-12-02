import { addSong, listSong } from "../controllers/songcontroller.js";
import express from "express";

const songRouter = express.Router();

// Using this songRouter router we can create multiple apis.

songRouter.post("/add", addSong);
songRouter.get("/list", listSong);

export default songRouter;
