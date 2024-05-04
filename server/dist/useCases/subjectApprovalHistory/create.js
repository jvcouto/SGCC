"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const class_validator_1 = require("class-validator");
const logger_1 = __importDefault(require("../../utils/logger"));
const invalidAttribute_error_1 = __importDefault(require("../../errors/invalidAttribute.error"));
const server_error_1 = __importDefault(require("../../errors/server.error"));
const subjectApprovalHistory_model_1 = __importDefault(require("../../models/subjectApprovalHistory.model"));
class CreateSubjectApprovalHistory {
    constructor(repository) {
        this.repository = repository;
    }
    async execute(subjectApprovalHistoryData) {
        const newSubjectApprovalHistory = Object.assign(new subjectApprovalHistory_model_1.default(), subjectApprovalHistoryData);
        const errors = await (0, class_validator_1.validate)(newSubjectApprovalHistory);
        if (errors.length > 0) {
            const formatedError = errors.map((error) => error.constraints);
            logger_1.default.error(JSON.stringify(formatedError));
            throw new invalidAttribute_error_1.default("Error on subject approval history creation");
        }
        try {
            const subjectApprovalHistoryCreated = await this.repository.save(newSubjectApprovalHistory);
            return subjectApprovalHistoryCreated;
        }
        catch (error) {
            logger_1.default.error(error.message);
            throw new server_error_1.default("Error on subject approval history creation");
        }
    }
}
exports.default = CreateSubjectApprovalHistory;
//# sourceMappingURL=create.js.map