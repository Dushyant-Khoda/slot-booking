import mongoose from "mongoose";
import { DB_URL } from "../../Config";

mongoose
  .connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB Connected Successfully");
  })
  .catch((err) => {
    console.log("Something went wrong while connecting to mongodb", err);
  });
