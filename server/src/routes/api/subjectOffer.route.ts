import { Router } from "express";
import expressCallback from "../utils/expressCallback";
import MakeSubjectOfferController from "@controllers/subjectOffer.controller";

const subjectOfferRoutes = Router();

subjectOfferRoutes
  .route("/")
  .post(expressCallback(MakeSubjectOfferController().create));

export default subjectOfferRoutes;
