"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const expressCallback_1 = __importDefault(require("../utils/expressCallback"));
const subjectOffer_controller_1 = __importDefault(require("../../controllers/subjectOffer.controller"));
const subjectApprovalHistory_1 = __importDefault(require("../../controllers/subjectApprovalHistory"));
const subjectOfferRoutes = (0, express_1.Router)();
subjectOfferRoutes
    .route("/")
    .post((0, expressCallback_1.default)((0, subjectOffer_controller_1.default)().create));
subjectOfferRoutes
    .route("/:id/approvalHistory")
    .post((0, expressCallback_1.default)((0, subjectApprovalHistory_1.default)().create));
subjectOfferRoutes
    .route("/:offerUid/request")
    .patch((0, expressCallback_1.default)((0, subjectOffer_controller_1.default)().request));
subjectOfferRoutes
    .route("/:offerUid/delete")
    .post((0, expressCallback_1.default)((0, subjectOffer_controller_1.default)().deleteRequest));
subjectOfferRoutes
    .route("/:offerUid")
    .patch((0, expressCallback_1.default)((0, subjectOffer_controller_1.default)().update));
subjectOfferRoutes
    .route("/offers/close-all")
    .patch((0, expressCallback_1.default)((0, subjectOffer_controller_1.default)().close));
subjectOfferRoutes
    .route("/:offerId/teachers")
    .get((0, expressCallback_1.default)((0, subjectOffer_controller_1.default)().getTeachers));
subjectOfferRoutes
    .route("/")
    .get((0, expressCallback_1.default)((0, subjectOffer_controller_1.default)().list));
subjectOfferRoutes
    .route("/:id")
    .get((0, expressCallback_1.default)((0, subjectOffer_controller_1.default)().findOne));
exports.default = subjectOfferRoutes;
//# sourceMappingURL=subjectOffer.route.js.map