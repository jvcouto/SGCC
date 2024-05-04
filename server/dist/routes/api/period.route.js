"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const expressCallback_1 = __importDefault(require("../utils/expressCallback"));
const period_controller_1 = __importDefault(require("../../controllers/period.controller"));
const semesterRoutes = (0, express_1.Router)();
semesterRoutes.route("/").post((0, expressCallback_1.default)((0, period_controller_1.default)().create));
semesterRoutes
    .route("/:id")
    .get((0, expressCallback_1.default)((0, period_controller_1.default)().findOne));
exports.default = semesterRoutes;
//# sourceMappingURL=period.route.js.map