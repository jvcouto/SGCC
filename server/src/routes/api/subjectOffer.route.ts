import { Router } from "express";
import expressCallback from "../utils/expressCallback";
import MakeSubjectOfferController from "@controllers/subjectOffer.controller";
import MakeSubjectApprovalHistoryController from "@controllers/subjectApprovalHistory";

const subjectOfferRoutes = Router();

subjectOfferRoutes
  .route("/")
  .post(expressCallback(MakeSubjectOfferController().create));

subjectOfferRoutes
  .route("/:id/approvalHistory")
  .post(expressCallback(MakeSubjectApprovalHistoryController().create));

export default subjectOfferRoutes;
