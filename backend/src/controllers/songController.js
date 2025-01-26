import { v2 as cloudinary } from "cloudinary";
import songModel from "../models/songModel.js";

// Controller for adding a song
const addSong = async (req, res) => {
  try {
    const name = req.body.name;
    const desc = req.body.desc;
    const album = req.body.album;
    const audioFile = req.files.audio[0];
    const imageFile = req.files.image[0];

    const audioUpload = await cloudinary.uploader.upload(audioFile.path, {
      resource_type: "video",
    }); // uploading audio and image file on our cloudinary storage.

    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });

    console.log(name, desc, album, audioUpload, imageUpload);
    const duration = `${Math.floor(audioUpload.duration / 60)}:${Math.floor(
      audioUpload.duration % 60
    )}`;

    const songData = {
      name,
      desc,
      album,
      image: imageUpload.secure_url,
      file: audioUpload.secure_url, // Fixed this to use audio file URL
      duration,
    };

    // Saving the data in the database
    const song = new songModel(songData);
    await song.save();

    res.json({ success: true, message: "Song Added" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Error adding song" });
  }
};

// Controller for listing songs
const listSong = async (req, res) => {
  try {
    const songs = await songModel.find(); // Fetch all songs from the database
    res.json({ success: true, data: songs });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Error fetching songs" });
  }
};

export { addSong, listSong };
