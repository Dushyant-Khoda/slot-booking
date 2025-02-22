import express from "express";
import { AuthController } from "../Controller";

const router = express.Router();

router.post("/login", AuthController.loginUser);
router.post("/register", AuthController.registerUser);

export default router;
