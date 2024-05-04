"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const teachingPlan_model_1 = __importDefault(require("../models/teachingPlan.model"));
const typeorm_1 = require("typeorm");
class TeachingPlanRepository {
    async save(teachingPlan) {
        const repository = (0, typeorm_1.getRepository)(teachingPlan_model_1.default);
        return repository.save(teachingPlan);
    }
    async findById(id) {
        const repository = (0, typeorm_1.getRepository)(teachingPlan_model_1.default);
        return repository.findOne(id);
    }
}
exports.default = TeachingPlanRepository;
//# sourceMappingURL=teachingPlan.repository.js.map