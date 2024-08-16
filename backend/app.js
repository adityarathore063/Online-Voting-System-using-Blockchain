import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import * as dotenv from "dotenv";
import router from "./routes/user-routes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/user",router);
dotenv.config();

const PORT = 8000;
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.k4kaxpx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
  )
  .then(() => app.listen(PORT))
  .then(() => console.log("Connected"))
  .catch((err) => console.log(err));