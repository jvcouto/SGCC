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
const course_model_1 = __importDefault(require("../../models/course.model"));
class UpdateCourse {
    constructor(repository) {
        this.repository = repository;
    }
    async execute(id, courseData) {
        const course = await this.repository.findOne(id);
        if (!course) {
            const errorMessage = "Course not found!";
            logger_1.default.error(errorMessage);
            throw new entityNotFound_error_1.default(errorMessage);
        }
        const updatedFields = Object.assign(new course_model_1.default(), {
            id,
            ...courseData,
        });
        if (updatedFields?.collegeMembers?.length) {
            updatedFields.collegeMembers = [
                ...updatedFields.collegeMembers,
                ...course.collegeMembers,
            ];
        }
        const errors = await (0, class_validator_1.validate)(updatedFields, {
            skipUndefinedProperties: true,
        });
        if (errors.length > 0) {
            const formatedError = errors.map((error) => error.constraints);
            logger_1.default.error(JSON.stringify(formatedError));
            throw new invalidAttribute_error_1.default("Error updating course");
        }
        try {
            const updatedCourse = await this.repository.save(updatedFields);
            return await this.repository.findOne(updatedCourse.id);
        }
        catch (error) {
            logger_1.default.error(error.message);
            throw new server_error_1.default("Error updating the course");
        }
    }
}
exports.default = UpdateCourse;
//# sourceMappingURL=update.js.map