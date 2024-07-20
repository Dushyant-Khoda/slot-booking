import express from "express";
const app = express();
import { PORT } from "./Config";
import loader from "./Src/main";
import ErrorMiddleware from "./Src/Middleware/ErrorMiddleware";

loader(app);
app.use(ErrorMiddleware);
app.listen(PORT, () => {
  console.log("Your server is connected at", PORT);
});
