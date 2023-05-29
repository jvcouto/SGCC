import { Router } from "express";
import expressCallback from "../utils/expressCallback";
import MakeSubjectRequestController from "@controllers/subjectRequest.controller";

const subjectRequestRoutes = Router();

subjectRequestRoutes
  .route("/")
  .post(expressCallback(MakeSubjectRequestController().create));

export default subjectRequestRoutes;
