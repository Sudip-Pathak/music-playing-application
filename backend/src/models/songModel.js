import mongoose from "mongoose";

const songSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Here required: true plays the role of saving name properly in database.
  desc: { type: String, required: true },
  album: { type: String, required: true },
  image: { type: String, required: true },
  file: { type: String, required: true },
  duration: { type: String, required: true },
});

const songModel = mongoose.models.song || mongoose.model("song", songSchema);

export default songModel;
