"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("../models/user.model"));
const paginationOptions_1 = require("../utils/constants/paginationOptions");
const typeorm_1 = require("typeorm");
class UserRepository {
    async findOne(value, key = "id") {
        const userRepository = (0, typeorm_1.getRepository)(user_model_1.default);
        const queryOptions = {
            where: key === "email" ? { email: value } : { id: value },
            relations: ["colleges", "departamentAdmin", "courseAdmin", "departament"],
        };
        return userRepository.findOne(queryOptions);
    }
    async getUserPassword(id) {
        const repository = (0, typeorm_1.getRepository)(user_model_1.default);
        return repository
            .createQueryBuilder("user")
            .select("user.id")
            .addSelect("user.password")
            .where("user.id = :userId", { userId: id })
            .getOne();
    }
    async save(user) {
        const userRepository = (0, typeorm_1.getRepository)(user_model_1.default);
        return userRepository.save(user);
    }
    async bulkUpdate(users) {
        const userRepository = (0, typeorm_1.getRepository)(user_model_1.default);
        return userRepository.save(users);
    }
    async findAll(query) {
        const repository = (0, typeorm_1.getRepository)(user_model_1.default);
        const queryOptions = {
            take: paginationOptions_1.MAX_TAKE_ITEMS,
        };
        if (query.name) {
            queryOptions.where = {
                name: (0, typeorm_1.Like)(`${query.name}%`),
            };
        }
        return repository.findAndCount(queryOptions);
    }
    async findByIds(ids) {
        const userRepository = (0, typeorm_1.getRepository)(user_model_1.default);
        return userRepository.findByIds(ids);
    }
}
exports.default = UserRepository;
//# sourceMappingURL=user.repository.js.map