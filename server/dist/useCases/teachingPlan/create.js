"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const class_validator_1 = require("class-validator");
const logger_1 = __importDefault(require("../../utils/logger"));
const invalidAttribute_error_1 = __importDefault(require("../../errors/invalidAttribute.error"));
const server_error_1 = __importDefault(require("../../errors/server.error"));
const duplicatedEntity_error_1 = __importDefault(require("../../errors/duplicatedEntity.error"));
const teachingPlan_model_1 = __importDefault(require("../../models/teachingPlan.model"));
class CreateTeachingPlan {
    constructor(repository) {
        this.repository = repository;
    }
    async execute(subjectOfferData) {
        const teachingPlan = Object.assign(new teachingPlan_model_1.default(), subjectOfferData);
        const errors = await (0, class_validator_1.validate)(teachingPlan);
        if (errors.length > 0) {
            const formatedError = errors.map((error) => error.constraints);
            logger_1.default.error(JSON.stringify(formatedError));
            throw new invalidAttribute_error_1.default("Error on teaching plan creation");
        }
        try {
            const createdSubjectOffer = await this.repository.save(teachingPlan);
            return await this.repository.findById(createdSubjectOffer.id);
        }
        catch (error) {
            if (error.routine === "_bt_check_unique") {
                logger_1.default.error(error.message);
                throw new duplicatedEntity_error_1.default("Duplicated teaching plan");
            }
            logger_1.default.error(error.message);
            throw new server_error_1.default("Error on teaching plan creation");
        }
    }
}
exports.default = CreateTeachingPlan;
//# sourceMappingURL=create.js.map