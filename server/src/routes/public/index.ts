import { Router } from "express";
import MakeUserController from "@controllers/user.controller";
import expressCallback from "../utils/expressCallback";
import MakeSemesterController from "@controllers/semester.controller";

const publicRoutes = Router();

publicRoutes
  .route("/auth")
  .post(expressCallback(MakeUserController().authenticate));

publicRoutes
  .route("/register")
  .post(expressCallback(MakeUserController().register));

publicRoutes
  .route("/list/semesters")
  .get(expressCallback(MakeSemesterController().list));

export default publicRoutes;
