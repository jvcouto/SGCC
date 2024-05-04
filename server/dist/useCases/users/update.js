"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("../../models/user.model"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const class_validator_1 = require("class-validator");
const logger_1 = __importDefault(require("../../utils/logger"));
const entityNotFound_error_1 = __importDefault(require("../../errors/entityNotFound.error"));
const invalidAttribute_error_1 = __importDefault(require("../../errors/invalidAttribute.error"));
const server_error_1 = __importDefault(require("../../errors/server.error"));
class UpdateUser {
    constructor(repository) {
        this.repository = repository;
    }
    async execute(id, userData) {
        const user = await this.repository.findOne(id);
        if (!user) {
            const errorMessage = "User not found!";
            logger_1.default.error(errorMessage);
            throw new entityNotFound_error_1.default(errorMessage);
        }
        if (userData.password) {
            const { password: userPassword } = (await this.repository.getUserPassword(user.id));
            if (!(await bcryptjs_1.default.compare(userData.password, userPassword))) {
                throw new invalidAttribute_error_1.default("Invalid Password");
            }
            delete userData.password;
        }
        if (userData.newPassword) {
            userData.password = bcryptjs_1.default.hashSync(userData.newPassword, 10);
            delete userData.newPasswordRepeat;
            delete userData.newPassword;
        }
        const updatedFields = Object.assign(new user_model_1.default(), {
            id,
            ...userData,
        });
        const errors = await (0, class_validator_1.validate)(updatedFields, {
            skipUndefinedProperties: true,
        });
        if (errors.length > 0) {
            const formatedError = errors.map((error) => error.constraints);
            logger_1.default.error(JSON.stringify(formatedError));
            throw new invalidAttribute_error_1.default("Error updating the user");
        }
        try {
            const updatedUser = await this.repository.save(updatedFields);
            return await this.repository.findOne(updatedUser.id);
        }
        catch (error) {
            logger_1.default.error(error.message);
            throw new server_error_1.default("Error updating the user");
        }
    }
}
exports.default = UpdateUser;
//# sourceMappingURL=update.js.map