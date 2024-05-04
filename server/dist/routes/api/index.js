"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const users_route_1 = __importDefault(require("./users.route"));
const course_route_1 = __importDefault(require("./course.route"));
const subject_route_1 = __importDefault(require("./subject.route"));
const period_route_1 = __importDefault(require("./period.route"));
const subjectOffer_route_1 = __importDefault(require("./subjectOffer.route"));
const departament_route_1 = __importDefault(require("./departament.route"));
const teachingPlan_route_1 = __importDefault(require("./teachingPlan.route"));
const routes = (0, express_1.Router)();
routes.use(authMiddleware_1.default);
routes.use("/user", users_route_1.default);
routes.use("/courses", course_route_1.default);
routes.use("/subjects", subject_route_1.default);
routes.use("/periods", period_route_1.default);
routes.use("/subjectOffer", subjectOffer_route_1.default);
routes.use("/departaments", departament_route_1.default);
routes.use("/teachingPlan", teachingPlan_route_1.default);
exports.default = routes;
//# sourceMappingURL=index.js.map