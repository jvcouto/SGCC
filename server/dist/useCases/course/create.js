"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const class_validator_1 = require("class-validator");
const logger_1 = __importDefault(require("../../utils/logger"));
const invalidAttribute_error_1 = __importDefault(require("../../errors/invalidAttribute.error"));
const server_error_1 = __importDefault(require("../../errors/server.error"));
const course_model_1 = __importDefault(require("../../models/course.model"));
class CreateCourse {
    constructor(repository) {
        this.repository = repository;
    }
    async execute(courseData) {
        const newCourse = Object.assign(new course_model_1.default(), courseData);
        const errors = await (0, class_validator_1.validate)(newCourse);
        if (errors.length > 0) {
            const formatedError = errors.map((error) => error.constraints);
            logger_1.default.error(JSON.stringify(formatedError));
            throw new invalidAttribute_error_1.default("Error on course creation");
        }
        try {
            return await this.repository.save(newCourse);
        }
        catch (error) {
            logger_1.default.error(error);
            throw new server_error_1.default("Error on course creation");
        }
    }
}
exports.default = CreateCourse;
//# sourceMappingURL=create.js.map