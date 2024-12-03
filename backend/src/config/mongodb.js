import mongoose from "mongoose";

const connectDB = async () => {

    mongoose.connection.on('connected', () => {
        console.log("Connectd to Database")
    })
  await mongoose.connect(`${process.env.MONGODB_URI}/musicapplication`);
};

export default connectDB;
