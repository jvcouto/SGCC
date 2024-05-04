"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../../utils/logger"));
const server_error_1 = __importDefault(require("../../errors/server.error"));
const missingParameter_error_1 = __importDefault(require("../../errors/missingParameter.error"));
class CloseOffers {
    constructor(repository) {
        this.repository = repository;
    }
    async execute(data) {
        const { subjectsIds, periodId, close, } = data;
        if (!subjectsIds.length) {
            throw new missingParameter_error_1.default("Subjects Ids is mandatory");
        }
        try {
            return await this.repository.closeSubjectsByPeriod(subjectsIds, periodId, close);
        }
        catch (error) {
            logger_1.default.error(error.message);
            throw new server_error_1.default("Error updating the subject offer");
        }
    }
}
exports.default = CloseOffers;
//# sourceMappingURL=closeOffers.js.map