"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const expressCallback_1 = __importDefault(require("../utils/expressCallback"));
const departament_controller_1 = __importDefault(require("../../controllers/departament.controller"));
const departamentRoutes = (0, express_1.Router)();
departamentRoutes
    .route("/")
    .post((0, expressCallback_1.default)((0, departament_controller_1.default)().create));
departamentRoutes
    .route("/")
    .get((0, expressCallback_1.default)((0, departament_controller_1.default)().list));
departamentRoutes
    .route("/:id")
    .get((0, expressCallback_1.default)((0, departament_controller_1.default)().findOne));
exports.default = departamentRoutes;
//# sourceMappingURL=departament.route.js.map