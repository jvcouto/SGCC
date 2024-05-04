"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const class_validator_1 = require("class-validator");
const logger_1 = __importDefault(require("../../utils/logger"));
const invalidAttribute_error_1 = __importDefault(require("../../errors/invalidAttribute.error"));
const server_error_1 = __importDefault(require("../../errors/server.error"));
const subject_model_1 = __importDefault(require("../../models/subject.model"));
const duplicatedEntity_error_1 = __importDefault(require("../../errors/duplicatedEntity.error"));
class CreateSubject {
    constructor(repository) {
        this.repository = repository;
    }
    async execute(subjectData) {
        if (subjectData.curriculum)
            subjectData.curriculum = new Date(subjectData.curriculum);
        const newSubjectData = Object.assign(new subject_model_1.default(), subjectData);
        const errors = await (0, class_validator_1.validate)(newSubjectData);
        if (errors.length > 0) {
            const formatedError = errors.map((error) => error.constraints);
            logger_1.default.error(JSON.stringify(formatedError));
            throw new invalidAttribute_error_1.default("Error on subject creation");
        }
        try {
            const newSubject = await this.repository.save(newSubjectData);
            return await this.repository.findOne(newSubject.id);
        }
        catch (error) {
            if (error.routine === "_bt_check_unique") {
                logger_1.default.error(error.message);
                throw new duplicatedEntity_error_1.default("Subject already exists for this course and curriculum year");
            }
            logger_1.default.error(error.message);
            throw new server_error_1.default("Error on subject creation");
        }
    }
}
exports.default = CreateSubject;
//# sourceMappingURL=create.js.map