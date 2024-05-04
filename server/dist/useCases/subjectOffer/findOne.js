"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const entityNotFound_error_1 = __importDefault(require("../../errors/entityNotFound.error"));
const logger_1 = __importDefault(require("../../utils/logger"));
const server_error_1 = __importDefault(require("../../errors/server.error"));
class FindOneSubjectOffer {
    constructor(repository) {
        this.repository = repository;
    }
    async execute(id, user) {
        try {
            const subjectOffer = await this.repository.findOneWithTeachingPlan(id, user);
            if (!subjectOffer)
                throw new entityNotFound_error_1.default("Subject Offer not found");
            return subjectOffer;
        }
        catch (error) {
            logger_1.default.error(error.message);
            throw new server_error_1.default("Error getting Subject Offer");
        }
    }
}
exports.default = FindOneSubjectOffer;
//# sourceMappingURL=findOne.js.map