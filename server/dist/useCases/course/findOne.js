"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const entityNotFound_error_1 = __importDefault(require("../../errors/entityNotFound.error"));
class FindOneCourse {
    constructor(repository) {
        this.repository = repository;
    }
    async execute(id, query) {
        const courseFound = await this.repository.findOne(id, query);
        if (!courseFound)
            throw new entityNotFound_error_1.default("Course not found");
        return courseFound;
    }
}
exports.default = FindOneCourse;
//# sourceMappingURL=findOne.js.map