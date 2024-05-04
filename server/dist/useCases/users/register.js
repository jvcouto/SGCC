"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const class_validator_1 = require("class-validator");
const user_model_1 = __importDefault(require("../../models/user.model"));
const duplicatedEntity_error_1 = __importDefault(require("../../errors/duplicatedEntity.error"));
const invalidAttribute_error_1 = __importDefault(require("../../errors/invalidAttribute.error"));
const server_error_1 = __importDefault(require("../../errors/server.error"));
const logger_1 = __importDefault(require("../../utils/logger"));
class RegisterUser {
    constructor(repository) {
        this.repository = repository;
    }
    async execute({ name, email, password, }) {
        const user = await this.repository.findOne(email, "email");
        if (user) {
            logger_1.default.error("validation failed.");
            throw new duplicatedEntity_error_1.default("Email already in use!");
        }
        const newUserData = {
            name,
            email,
            password: bcryptjs_1.default.hashSync(password, 10),
        };
        const newUser = Object.assign(new user_model_1.default(), newUserData);
        const errors = await (0, class_validator_1.validate)(newUser);
        if (errors.length > 0) {
            const formatedError = errors.map((error) => error.constraints);
            logger_1.default.error(JSON.stringify(formatedError));
            throw new invalidAttribute_error_1.default("Error on user registration");
        }
        try {
            return await this.repository.save(newUser);
        }
        catch (error) {
            logger_1.default.error(error);
            throw new server_error_1.default("Error on user save");
        }
    }
}
exports.default = RegisterUser;
//# sourceMappingURL=register.js.map