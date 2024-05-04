"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const departament_1 = __importDefault(require("../models/departament"));
const typeorm_1 = require("typeorm");
const paginationOptions_1 = require("../utils/constants/paginationOptions");
class DepartamentRepository {
    async save(departament) {
        const repository = (0, typeorm_1.getRepository)(departament_1.default);
        return repository.save(departament);
    }
    async findOne(id, query) {
        const repository = (0, typeorm_1.getRepository)(departament_1.default);
        const queryrun = repository
            .createQueryBuilder("departament")
            .leftJoinAndSelect("departament.teachers", "teachers")
            .leftJoinAndSelect("departament.admins", "admins")
            .leftJoinAndSelect("admins.user", "user")
            .leftJoinAndSelect("departament.subjects", "subjects")
            .leftJoinAndSelect("subjects.course", "course")
            .leftJoinAndSelect("course.admins", "courseAdmins")
            .leftJoinAndSelect("courseAdmins.user", "courseAdminsUser")
            .leftJoinAndSelect("subjects.offers", "offers", query?.period && `offers.period.id = ${query.period}`)
            .leftJoinAndSelect("offers.period", "period")
            .leftJoinAndSelect("offers.teachers", "offerTeachers")
            .where("departament.id = :id", { id: id });
        return queryrun.getOne();
    }
    async findAll(query) {
        const repository = (0, typeorm_1.getRepository)(departament_1.default);
        const queryOptions = {};
        if (query.name) {
            queryOptions.where = {
                name: (0, typeorm_1.Like)(`${query.name}%`),
            };
        }
        if (query.page) {
            queryOptions.skip = query.page * paginationOptions_1.DEFAULT_PAGE_SIZE;
            queryOptions.take = paginationOptions_1.DEFAULT_PAGE_SIZE;
        }
        else {
            queryOptions.take = paginationOptions_1.MAX_TAKE_ITEMS;
        }
        return repository.findAndCount(queryOptions);
    }
}
exports.default = DepartamentRepository;
//# sourceMappingURL=departament.repository.js.map