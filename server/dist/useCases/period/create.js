"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const class_validator_1 = require("class-validator");
const logger_1 = __importDefault(require("../../utils/logger"));
const invalidAttribute_error_1 = __importDefault(require("../../errors/invalidAttribute.error"));
const server_error_1 = __importDefault(require("../../errors/server.error"));
const period_model_1 = __importDefault(require("../../models/period.model"));
class CreatePeriod {
    constructor(repository) {
        this.repository = repository;
    }
    async execute(periodData) {
        if (periodData.startDate)
            periodData.startDate = new Date(periodData.startDate);
        if (periodData.endDate)
            periodData.endDate = new Date(periodData.endDate);
        const newPeriod = Object.assign(new period_model_1.default(), periodData);
        const errors = await (0, class_validator_1.validate)(newPeriod);
        if (errors.length > 0) {
            const formatedError = errors.map((error) => error.constraints);
            logger_1.default.error(JSON.stringify(formatedError));
            throw new invalidAttribute_error_1.default("Error on period creation");
        }
        try {
            return await this.repository.save(newPeriod);
        }
        catch (error) {
            logger_1.default.error(error.message);
            throw new server_error_1.default("Error on period creation");
        }
    }
}
exports.default = CreatePeriod;
//# sourceMappingURL=create.js.map