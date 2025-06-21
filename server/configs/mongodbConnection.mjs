import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const createConnection = async () => {
  await mongoose
    .connect(process.env.MONGO_URI + "")
    .then(() => {
      console.log("MongoDB connection established");
    })
    .catch((err) => {
      throw err;
    });
};

export default createConnection;
