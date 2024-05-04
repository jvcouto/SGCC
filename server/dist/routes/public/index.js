"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = __importDefault(require("../../controllers/user.controller"));
const expressCallback_1 = __importDefault(require("../utils/expressCallback"));
const period_controller_1 = __importDefault(require("../../controllers/period.controller"));
const publicRoutes = (0, express_1.Router)();
publicRoutes
    .route("/auth")
    .post((0, expressCallback_1.default)((0, user_controller_1.default)().authenticate));
publicRoutes
    .route("/register")
    .post((0, expressCallback_1.default)((0, user_controller_1.default)().register));
publicRoutes
    .route("/list/periods")
    .get((0, expressCallback_1.default)((0, period_controller_1.default)().list));
exports.default = publicRoutes;
//# sourceMappingURL=index.js.map