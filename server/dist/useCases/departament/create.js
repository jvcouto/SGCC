"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const class_validator_1 = require("class-validator");
const logger_1 = __importDefault(require("../../utils/logger"));
const invalidAttribute_error_1 = __importDefault(require("../../errors/invalidAttribute.error"));
const server_error_1 = __importDefault(require("../../errors/server.error"));
const departament_1 = __importDefault(require("../../models/departament"));
class CreateDepartament {
    constructor(repository) {
        this.repository = repository;
    }
    async execute(departamentData) {
        if (departamentData.admins && departamentData.admins.length) {
            departamentData.admins.forEach((admin) => {
                admin.createdAt = new Date();
            });
        }
        const newDepartament = Object.assign(new departament_1.default(), departamentData);
        const errors = await (0, class_validator_1.validate)(newDepartament);
        if (errors.length > 0) {
            const formatedError = errors.map((error) => error.constraints);
            logger_1.default.error(JSON.stringify(formatedError));
            throw new invalidAttribute_error_1.default("Error on departament creation");
        }
        try {
            return await this.repository.save(newDepartament);
        }
        catch (error) {
            logger_1.default.error(error.message);
            throw new server_error_1.default("Error on departament creation");
        }
    }
}
exports.default = CreateDepartament;
//# sourceMappingURL=create.js.map