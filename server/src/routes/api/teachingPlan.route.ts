import { Router } from "express";
import expressCallback from "../utils/expressCallback";
import MakeTeachingPlanController from "@controllers/teachingPlan.controller";

const teachingPlanRouter = Router();

teachingPlanRouter
  .route("/")
  .post(expressCallback(MakeTeachingPlanController().create));

teachingPlanRouter.route("/").patch(MakeTeachingPlanController().update);

export default teachingPlanRouter;
