import { Router } from "express";
import expressCallback from "../utils/expressCallback";
import MakeSemesterController from "@controllers/semester.controller";

const semesterRoutes = Router();

semesterRoutes
  .route("/")
  .post(expressCallback(MakeSemesterController().create));

semesterRoutes
  .route("/:id")
  .get(expressCallback(MakeSemesterController().findOne));

export default semesterRoutes;
