import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

import dotenv from "dotenv";
dotenv.config({ path: "./configs/.env" });

import createConnection from "./configs/mongodbConnection.mjs";
import userRouter from "./routes/user.mjs";
import hotelRouter from "./routes/hotel.mjs";
import roomRouter from "./routes/room.mjs";

const app = express();

const PORT = process.env.PORT;

if (!PORT) {
  throw new Error("PORT is not defined in the environment");
}

createConnection()
  .then(() => {
    app.use(cookieParser());
    app.use(cors());
    app.use(bodyParser.json());
    app.use("/users", userRouter);
    app.use("/hotels", hotelRouter);
    app.use("/rooms", roomRouter);

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server started @${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err.message);
  });
