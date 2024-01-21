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

subjectOfferRoutes
  .route("/:offerUid/request")
  .patch(expressCallback(MakeSubjectOfferController().request));

subjectOfferRoutes
  .route("/:offerUid/delete")
  .post(expressCallback(MakeSubjectOfferController().deleteRequest));

export default subjectOfferRoutes;
