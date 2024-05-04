"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const course_model_1 = __importDefault(require("../models/course.model"));
const typeorm_1 = require("typeorm");
const paginationOptions_1 = require("../utils/constants/paginationOptions");
class CourseRepository {
    async findAll(query) {
        const repository = (0, typeorm_1.getRepository)(course_model_1.default);
        const queryOptions = {};
        if (query.page) {
            queryOptions.skip = query.page * paginationOptions_1.DEFAULT_PAGE_SIZE;
            queryOptions.take = paginationOptions_1.DEFAULT_PAGE_SIZE;
        }
        else {
            queryOptions.take = paginationOptions_1.MAX_TAKE_ITEMS;
        }
        return repository.findAndCount(queryOptions);
    }
    async findOne(id, query) {
        const repository = (0, typeorm_1.getRepository)(course_model_1.default);
        const queryrun = repository
            .createQueryBuilder("course")
            .leftJoinAndSelect("course.collegeMembers", "collegeMembers")
            .leftJoinAndSelect("course.admins", "admins")
            .leftJoinAndSelect("admins.user", "user")
            .leftJoinAndSelect("course.subjects", "subjects")
            .leftJoinAndSelect("subjects.departament", "departament")
            .leftJoinAndSelect("departament.admins", "departamentAdmins")
            .leftJoinAndSelect("departamentAdmins.user", "departamentAdminsUser")
            .leftJoinAndSelect("subjects.preRequisite", "preRequisite")
            .leftJoinAndSelect("subjects.coRequisite", "coRequisite")
            .leftJoinAndSelect("subjects.offers", "offers", query?.period && `offers.period.id = ${query.period}`)
            .leftJoinAndSelect("offers.period", "period")
            .where("course.id = :id", { id: id });
        return queryrun.getOne();
    }
    async save(data) {
        const repository = (0, typeorm_1.getRepository)(course_model_1.default);
        if (data.admins && data.admins.length) {
            data.admins.forEach((admin) => {
                admin.createdAt = new Date();
            });
        }
        return repository.save(data);
    }
}
exports.default = CourseRepository;
//# sourceMappingURL=course.repository.js.map