import { Router } from "express";
import expressCallback from "../utils/expressCallback";
import MakeCourseController from "@controllers/course.controller";

const courseRoutes = Router();

courseRoutes.route("/").post(expressCallback(MakeCourseController().create));

export default courseRoutes;
