"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const class_validator_1 = require("class-validator");
const logger_1 = __importDefault(require("../../utils/logger"));
const entityNotFound_error_1 = __importDefault(require("../../errors/entityNotFound.error"));
const invalidAttribute_error_1 = __importDefault(require("../../errors/invalidAttribute.error"));
const server_error_1 = __importDefault(require("../../errors/server.error"));
const teachingPlan_model_1 = __importDefault(require("../../models/teachingPlan.model"));
class UpdateTeachingPlan {
    constructor(repository) {
        this.repository = repository;
    }
    async execute(id, updateData) {
        const teachingPlan = await this.repository.findById(Number(id));
        if (!teachingPlan) {
            const errorMessage = "Teaching Plan not found!";
            logger_1.default.error(errorMessage);
            throw new entityNotFound_error_1.default(errorMessage);
        }
        const teachingPlanUpdated = Object.assign(new teachingPlan_model_1.default(), {
            id,
            ...updateData,
        });
        const errors = await (0, class_validator_1.validate)(teachingPlanUpdated, {
            skipUndefinedProperties: true,
        });
        if (errors.length > 0) {
            const formatedError = errors.map((error) => error.constraints);
            logger_1.default.error(JSON.stringify(formatedError));
            throw new invalidAttribute_error_1.default("Error updating teaching plan");
        }
        try {
            const updatedTeachingPlan = await this.repository.save(teachingPlanUpdated);
            return await this.repository.findById(updatedTeachingPlan.id);
        }
        catch (error) {
            logger_1.default.error(error.message);
            throw new server_error_1.default("Error updating teaching plan");
        }
    }
}
exports.default = UpdateTeachingPlan;
//# sourceMappingURL=update.js.map