"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("../../models/user.model"));
const class_validator_1 = require("class-validator");
const logger_1 = __importDefault(require("../../utils/logger"));
const invalidAttribute_error_1 = __importDefault(require("../../errors/invalidAttribute.error"));
const server_error_1 = __importDefault(require("../../errors/server.error"));
class BulkUpdateUser {
    constructor(repository) {
        this.repository = repository;
    }
    async execute(ids, updatedValues) {
        const updatedUsersData = ids.map((id) => {
            return Object.assign(new user_model_1.default(), {
                id,
                ...updatedValues,
            });
        });
        updatedUsersData.forEach(async (eachUserUpdated) => {
            const errors = await (0, class_validator_1.validate)(eachUserUpdated, {
                skipUndefinedProperties: true,
            });
            if (errors.length > 0) {
                const formatedError = errors.map((error) => error.constraints);
                logger_1.default.error(JSON.stringify(formatedError));
                throw new invalidAttribute_error_1.default("Error updating the user");
            }
        });
        try {
            const updatedUsers = await this.repository.bulkUpdate(updatedUsersData);
            const returndata = await this.repository.findByIds(updatedUsers.map((e) => e.id));
            return returndata;
        }
        catch (error) {
            logger_1.default.error(error.message);
            throw new server_error_1.default("Error bulk updating users");
        }
    }
}
exports.default = BulkUpdateUser;
//# sourceMappingURL=bulkUpdate.js.map