import mongoose from "mongoose";

const connectDB = async () => {
  mongoose.connection.on("connected", () => {
    console.log("MongoDB connection established");
  });

  mongoose.connection.on("error", (err) => {
    console.error(`MongoDB connection error: ${err}`);
  });

  mongoose.connection.on("disconnected", () => {
    console.log("MongoDB connection disconnected");
  });

  try {
    await mongoose.connect(
      `${process.env.MONGODB_URI}/music-playing-application`
    );
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

export default connectDB;
