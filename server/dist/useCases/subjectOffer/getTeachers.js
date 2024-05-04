"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../../utils/logger"));
const server_error_1 = __importDefault(require("../../errors/server.error"));
class GetOfferTeachers {
    constructor(repository) {
        this.repository = repository;
    }
    async execute(offerId) {
        try {
            const teachers = await this.repository.getSubjectOfferTeachers(offerId);
            return teachers?.teachers || [];
        }
        catch (error) {
            logger_1.default.error(error.message);
            throw new server_error_1.default("Error fetching offer teachers");
        }
    }
}
exports.default = GetOfferTeachers;
//# sourceMappingURL=getTeachers.js.map