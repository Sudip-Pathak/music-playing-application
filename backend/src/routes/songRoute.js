import { addSong, listSong } from "../controllers/songcontroller";
import express from "express";

const songRouter = express.Router();

// Using this songRouter router we can create multiple apis.

songRouter.post("/add", addSong);
songRouter.get("/lsit", listSong);

export default songRouter;
