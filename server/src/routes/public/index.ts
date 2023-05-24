import { Router } from "express";
import MakeUserController from "@controllers/user.controller";
import expressCallback from "../utils/expressCallback";

const publicRoutes = Router();

publicRoutes
  .route("/login")
  .post(expressCallback(MakeUserController().authenticate));

publicRoutes
  .route("/register")
  .post(expressCallback(MakeUserController().register));

export default publicRoutes;
