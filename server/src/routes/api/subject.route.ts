import { Router } from "express";
import expressCallback from "../utils/expressCallback";
import MakeSubjectController from "@controllers/subject.controller";

const subjectRoutes = Router();

subjectRoutes.route("/").post(expressCallback(MakeSubjectController().create));

export default subjectRoutes;
