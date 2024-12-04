import { addSong, listSong } from "../controllers/songcontroller.js";
import express from "express";
import upload from "../middleware/multer.js";

const songRouter = express.Router();

// Using this songRouter router we can create multiple apis.

songRouter.post("/add", upload.fields([{name:'image', maxCount:1}, {name:'audio', maxCount:1}]), addSong);
songRouter.get("/list", listSong);

export default songRouter;
