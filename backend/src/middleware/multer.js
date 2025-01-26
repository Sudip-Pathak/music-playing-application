// This middleware extracts file from api request. And it will also provides its path.
import multer from "multer";

const storage = multer.diskStorage({
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  },
});

const upload = multer({ storage });

export default upload;

// import multer from "multer";
// import path from "path";

// // Storage setup for multer, defining destination and filename
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/"); // specify the folder where files should be stored
//   },
//   filename: (req, file, cb) => {
//     // Ensure unique file names by appending timestamp
//     cb(null, Date.now() + path.extname(file.originalname));
//   },
// });

// // File filter setup (optional, if you want to restrict file types)
// const fileFilter = (req, file, cb) => {
//   // Allow only image and audio files
//   const allowedTypes = ["image/jpeg", "image/png", "audio/mpeg", "audio/wav"];
//   if (allowedTypes.includes(file.mimetype)) {
//     cb(null, true); // Accept file
//   } else {
//     cb(new Error("Invalid file type"), false); // Reject file
//   }
// };

// // Setup multer to handle multiple fields (image and audio)
// const upload = multer({
//   storage,
//   limits: { fileSize: 10 * 1024 * 1024 }, // Limit file size to 10MB
//   fileFilter, // Optional file filter
// }).fields([
//   { name: "audio", maxCount: 1 }, // Field for audio file
//   { name: "image", maxCount: 1 }, // Field for image file
// ]);

// export default upload;
