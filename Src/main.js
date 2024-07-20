import express from "express";
import bodyParser, { urlencoded } from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
const morgan = require("morgan");
const chalk = require("chalk");
import "./Database";
import { AdminRoutes, AuthRoutes, SubAdminRoutes, UserRoutes } from "./Routes";

const loader = (app) => {
  app.use(express.json());
  app.use(cookieParser());
  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(
    morgan(":method :url :status :res[content-length] - :response-time ms")
  );

  app.use((req, res, next) => {
    console.log(chalk.yellow("Endpoint: ") + chalk.blueBright(req.originalUrl));
    console.log(req.body); // this is what you want
    next();
  });

  app.use("/api/v1/users", UserRoutes);
  app.use("/api/v1/auth", AuthRoutes);
  app.use("/api/v1/admin", AdminRoutes);
  app.use("/api/v1/subadmin", SubAdminRoutes);
};

export default loader;
