import mongoose from "mongoose";

const connectDB = async () => {
  mongoose.connect.on("connected", () => {
    console.log("connection establisjed");
  });

  await mongoose.connect(
    `${process.env.MONGODB_URI}/music-playing-application`
  );
};

export default connectDB;
