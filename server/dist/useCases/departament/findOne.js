"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../../utils/logger"));
const entityNotFound_error_1 = __importDefault(require("../../errors/entityNotFound.error"));
class FindOneDepartament {
    constructor(repository) {
        this.repository = repository;
    }
    async execute(id, query) {
        const departamentFound = await this.repository.findOne(id, query);
        if (!departamentFound) {
            const errorMessage = "Departament not found";
            logger_1.default.info(errorMessage);
            throw new entityNotFound_error_1.default(errorMessage);
        }
        return departamentFound;
    }
}
exports.default = FindOneDepartament;
//# sourceMappingURL=findOne.js.map