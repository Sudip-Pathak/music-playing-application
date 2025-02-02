// Working with album controller.

import { v2 as cloudinary } from "cloudinary";
import albumModel from "../models/albumModel.js";

// Controller for adding Album.
const addAlbum = async (req, res) => {
  try {
    const name = req.body.name;
    const desc = req.body.desc;
    const bgColour = req.body.bgColour;
    const imageFile = req.file;
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });
    const albumData = {
      name,
      desc,
      bgColour,
      image: imageUpload.secure_url,
    };

    const album = albumModel(albumData);
    await album.save();

    res.json({ success: true, message: "Album Added" });
  } catch (error) {
    res.json({ success: false, message: "Album Not Added" });
  }
};

// Controller for listing all the album data.
const listAlbum = async (req, res) => {
  try {
    const allAlbums = await albumModel.find({});
    res.json({ success: true, albums: allAlbums });
  } catch (error) {
    res.json({ success: false, message: "No List of albums" });
  }
};

// Controller for Deleting the Album.
const removeAlbum = async (req, res) => {
  try {
    await albumModel.findByIdAndDelete(req.body.id);
    res.json({ suceess: true, message: "Album Removed" });
  } catch (error) {
    res.json({ success: false, message: "Album Not Removed" });
  }
};

export { addAlbum, listAlbum, removeAlbum };
