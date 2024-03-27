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

subjectOfferRoutes
  .route("/:offerUid")
  .patch(expressCallback(MakeSubjectOfferController().update));

subjectOfferRoutes
  .route("/offers/close-all")
  .patch(expressCallback(MakeSubjectOfferController().close));

subjectOfferRoutes
  .route("/:offerId/teachers")
  .get(expressCallback(MakeSubjectOfferController().getTeachers));

subjectOfferRoutes
  .route("/")
  .get(expressCallback(MakeSubjectOfferController().list));

subjectOfferRoutes
  .route("/:id")
  .get(expressCallback(MakeSubjectOfferController().findOne));

export default subjectOfferRoutes;
