import express from "express";
import { SubAdminController, UserController } from "../Controller";
import {
  AuthenticationMiddleware,
  AuthorizationMiddleware,
} from "../Middleware";
const router = express.Router();

router.post(
  "/service",
  AuthenticationMiddleware,
  AuthorizationMiddleware("sub_admin"),
  SubAdminController.doAddService
);

router.get(
  "/services",
  AuthenticationMiddleware,
  AuthorizationMiddleware("sub_admin"),
  SubAdminController.listServiceRecords
);

router.get(
  "/service/:id",
  AuthenticationMiddleware,
  AuthorizationMiddleware("sub_admin"),
  SubAdminController.getServiceDetails
);

router.put(
  "/service/:id",
  AuthenticationMiddleware,
  AuthorizationMiddleware("sub_admin"),
  SubAdminController.doEditServiceDetails
);

router.delete(
  "/service/:id",
  AuthenticationMiddleware,
  AuthorizationMiddleware("sub_admin"),
  SubAdminController.doRemoveService
);

export default router;
