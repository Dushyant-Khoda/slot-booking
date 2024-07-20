import express from "express";
import { AdminController, UserController } from "../Controller";
import {
  AuthenticationMiddleware,
  AuthorizationMiddleware,
} from "../Middleware";
const router = express.Router();

router.put(
  "/service/:id",
  AuthenticationMiddleware,
  AuthorizationMiddleware("admin"),
  AdminController.doUpdateServiceStatus
);

router.put(
  "/user/:id",
  AuthenticationMiddleware,
  AuthorizationMiddleware("admin"),
  AdminController.doUpdateUserStatus
);

router.post(
  "/users",
  AuthenticationMiddleware,
  AuthorizationMiddleware("admin"),
  AdminController.doAddUser
);

export default router;
