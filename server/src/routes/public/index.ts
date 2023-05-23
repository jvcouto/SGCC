import { Router } from "express";
import userController from "@controllers/user.controller";
import expressCallback from "../utils/expressCallback";

const publicRoutes = Router();

publicRoutes.route("/login").post(expressCallback(userController.authenticate));

publicRoutes
  .route("/register-admin")
  .post(expressCallback(userController.register));

export default publicRoutes;
