"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const expressCallback_1 = __importDefault(require("../utils/expressCallback"));
const course_controller_1 = __importDefault(require("../../controllers/course.controller"));
const courseRoutes = (0, express_1.Router)();
courseRoutes.route("/").post((0, expressCallback_1.default)((0, course_controller_1.default)().create));
courseRoutes.route("/").get((0, expressCallback_1.default)((0, course_controller_1.default)().list));
courseRoutes.route("/:id").get((0, expressCallback_1.default)((0, course_controller_1.default)().findOne));
courseRoutes
    .route("/:id")
    .patch((0, expressCallback_1.default)((0, course_controller_1.default)().update));
courseRoutes
    .route("/:id/offerRequired")
    .post((0, expressCallback_1.default)((0, course_controller_1.default)().offerAllRequiredSubjects));
courseRoutes
    .route("/:id/download/pdf")
    .get((0, expressCallback_1.default)((0, course_controller_1.default)().downloadCourseOffersPDF));
exports.default = courseRoutes;
//# sourceMappingURL=course.route.js.map