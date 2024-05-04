"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const subjectApprovalHistory_model_1 = __importDefault(require("../models/subjectApprovalHistory.model"));
class SubjectApprovalHistoryRepository {
    async save(subjectApprovalHistory) {
        const repository = (0, typeorm_1.getRepository)(subjectApprovalHistory_model_1.default);
        return repository.save(subjectApprovalHistory);
    }
}
exports.default = SubjectApprovalHistoryRepository;
//# sourceMappingURL=subjectApprovalHistory.repository.js.map