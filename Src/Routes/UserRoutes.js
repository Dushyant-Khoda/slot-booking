import express from "express";
import { UserController } from "../Controller";
import { AuthenticationMiddleware } from "../Middleware";
const router = express.Router();

router.post("/book-slot", AuthenticationMiddleware, UserController.doBookSlot);

export default router;
