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

    res.json({ suceess: true, messge: "Album Added" });
  } catch {
    res.json({ suceess: false, message: "Song Not Added" });
  }
};

const listAlbum = async (req, resp) => {};

const removeAlbum = async (req, res) => {};

export { addAlbum, listAlbum, removeAlbum };
