import { Router } from "express";
import expressCallback from "../utils/expressCallback";
import MakeCourseController from "@controllers/course.controller";

const courseRoutes = Router();

courseRoutes.route("/").post(expressCallback(MakeCourseController().create));
courseRoutes.route("/").get(expressCallback(MakeCourseController().list));
courseRoutes.route("/:id").get(expressCallback(MakeCourseController().findOne));
courseRoutes
  .route("/:id")
  .patch(expressCallback(MakeCourseController().update));
courseRoutes
  .route("/:id/offerRequired")
  .post(expressCallback(MakeCourseController().offerAllRequiredSubjects));

courseRoutes
  .route("/:id/download/pdf")
  .get(expressCallback(MakeCourseController().downloadCourseOffersPDF));

export default courseRoutes;
