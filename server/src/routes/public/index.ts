import { Router } from "express";
import MakeUserController from "@controllers/user.controller";
import expressCallback from "../utils/expressCallback";
import MakePeriodController from "@controllers/period.controller";

const publicRoutes = Router();

publicRoutes
  .route("/auth")
  .post(expressCallback(MakeUserController().authenticate));

publicRoutes
  .route("/register")
  .post(expressCallback(MakeUserController().register));

publicRoutes
  .route("/list/periods")
  .get(expressCallback(MakePeriodController().list));

export default publicRoutes;
