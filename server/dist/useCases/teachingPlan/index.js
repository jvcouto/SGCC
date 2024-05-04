"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTeachingPlan = exports.updateTeachingPlan = void 0;
const teachingPlan_repository_1 = __importDefault(require("../../data-access/teachingPlan.repository"));
const update_1 = __importDefault(require("./update"));
const create_1 = __importDefault(require("./create"));
const teachingPlanRepository = new teachingPlan_repository_1.default();
const updateTeachingPlan = new update_1.default(teachingPlanRepository);
exports.updateTeachingPlan = updateTeachingPlan;
const createTeachingPlan = new create_1.default(teachingPlanRepository);
exports.createTeachingPlan = createTeachingPlan;
//# sourceMappingURL=index.js.map