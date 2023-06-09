import { Router } from "express";
import expressCallback from "../utils/expressCallback";
import MakePeriodController from "@controllers/period.controller";

const semesterRoutes = Router();

semesterRoutes.route("/").post(expressCallback(MakePeriodController().create));

semesterRoutes
  .route("/:id")
  .get(expressCallback(MakePeriodController().findOne));

export default semesterRoutes;
