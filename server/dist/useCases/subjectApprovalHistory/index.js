"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSubjectApprovalHistory = void 0;
const subjectApprovalHistory_repository_1 = __importDefault(require("../../data-access/subjectApprovalHistory.repository"));
const create_1 = __importDefault(require("./create"));
const subjectApprovalHistoryRepository = new subjectApprovalHistory_repository_1.default();
const createSubjectApprovalHistory = new create_1.default(subjectApprovalHistoryRepository);
exports.createSubjectApprovalHistory = createSubjectApprovalHistory;
//# sourceMappingURL=index.js.map