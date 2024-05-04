"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_controller_1 = __importDefault(require("../../controllers/user.controller"));
const express_1 = require("express");
const expressCallback_1 = __importDefault(require("../utils/expressCallback"));
const routes = (0, express_1.Router)();
routes.route("/:id").patch((0, expressCallback_1.default)((0, user_controller_1.default)().update));
routes
    .route("/current")
    .get((0, expressCallback_1.default)((0, user_controller_1.default)().getCurrentUser));
routes.route("/").get((0, expressCallback_1.default)((0, user_controller_1.default)().list));
routes.route("/update").post((0, expressCallback_1.default)((0, user_controller_1.default)().bulkUpdate));
exports.default = routes;
//# sourceMappingURL=users.route.js.map