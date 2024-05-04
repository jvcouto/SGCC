"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const expressCallback_1 = __importDefault(require("../utils/expressCallback"));
const subject_controller_1 = __importDefault(require("../../controllers/subject.controller"));
const subjectRoutes = (0, express_1.Router)();
subjectRoutes.route("/").post((0, expressCallback_1.default)((0, subject_controller_1.default)().create));
subjectRoutes.route("/").get((0, expressCallback_1.default)((0, subject_controller_1.default)().list));
exports.default = subjectRoutes;
//# sourceMappingURL=subject.route.js.map