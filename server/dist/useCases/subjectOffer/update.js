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
const subjectOffer_model_1 = __importDefault(require("../../models/subjectOffer.model"));
class UpdateSubjectOffer {
    constructor(repository) {
        this.repository = repository;
    }
    async execute(id, updateData) {
        const subejctOffer = await this.repository.findOne(id);
        if (!subejctOffer) {
            const errorMessage = "Subejct Offer not found!";
            logger_1.default.error(errorMessage);
            throw new entityNotFound_error_1.default(errorMessage);
        }
        const subejctOfferUpdated = Object.assign(new subjectOffer_model_1.default(), {
            id,
            ...updateData,
        });
        const errors = await (0, class_validator_1.validate)(subejctOfferUpdated, {
            skipUndefinedProperties: true,
        });
        if (errors.length > 0) {
            const formatedError = errors.map((error) => error.constraints);
            logger_1.default.error(JSON.stringify(formatedError));
            throw new invalidAttribute_error_1.default("Error updating Subejct Offer");
        }
        try {
            const updatedSubjectOffer = await this.repository.save(subejctOfferUpdated);
            return await this.repository.findOne(updatedSubjectOffer.id);
        }
        catch (error) {
            logger_1.default.error(error.message);
            throw new server_error_1.default("Error updating the subject offer");
        }
    }
}
exports.default = UpdateSubjectOffer;
//# sourceMappingURL=update.js.map