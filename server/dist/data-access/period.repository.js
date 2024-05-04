"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const period_model_1 = __importDefault(require("../models/period.model"));
const paginationOptions_1 = require("../utils/constants/paginationOptions");
class PeriodRepository {
    async save(period) {
        const repository = (0, typeorm_1.getRepository)(period_model_1.default);
        return repository.save(period);
    }
    async findOne(id) {
        const repository = (0, typeorm_1.getRepository)(period_model_1.default);
        return repository.findOne(id);
    }
    async findAll(query) {
        const repository = (0, typeorm_1.getRepository)(period_model_1.default);
        const queryOptions = {};
        queryOptions.order = { id: "DESC" };
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
exports.default = PeriodRepository;
//# sourceMappingURL=period.repository.js.map