"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const subject_model_1 = __importDefault(require("../models/subject.model"));
class SubjectRepository {
    async find(query) {
        const repository = (0, typeorm_1.getRepository)(subject_model_1.default);
        return repository.findAndCount({
            skip: query.page,
            take: query.page_size,
        });
    }
    async save(subject) {
        const repository = (0, typeorm_1.getRepository)(subject_model_1.default);
        return repository.save(subject);
    }
    async findOne(id) {
        const repository = (0, typeorm_1.getRepository)(subject_model_1.default);
        return repository.findOne(id, { relations: ["departament"] });
    }
    async findSubjectsByCourse(courseId, addRequired, addOptional) {
        const repository = (0, typeorm_1.getRepository)(subject_model_1.default);
        return repository.find({
            where: {
                course: {
                    id: courseId,
                },
                ...(addRequired && addOptional ? {} : { optionalSubject: addOptional }),
            },
        });
    }
}
exports.default = SubjectRepository;
//# sourceMappingURL=subject.repository.js.map