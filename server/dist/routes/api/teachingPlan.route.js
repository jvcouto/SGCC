"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const expressCallback_1 = __importDefault(require("../utils/expressCallback"));
const teachingPlan_controller_1 = __importDefault(require("../../controllers/teachingPlan.controller"));
const teachingPlanRouter = (0, express_1.Router)();
teachingPlanRouter
    .route("/")
    .post((0, expressCallback_1.default)((0, teachingPlan_controller_1.default)().create));
teachingPlanRouter.route("/").patch((0, teachingPlan_controller_1.default)().update);
exports.default = teachingPlanRouter;
//# sourceMappingURL=teachingPlan.route.js.map