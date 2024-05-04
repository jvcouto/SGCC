"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../../utils/logger"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const server_error_1 = __importDefault(require("../../errors/server.error"));
class GetAuthenticatedUserInfo {
    constructor(repository) {
        this.repository = repository;
    }
    async execute(token) {
        try {
            const data = jsonwebtoken_1.default.verify(token, process.env.JWT_TOKEN);
            const { id, userRoles } = data;
            const user = (await this.repository.findOne(id));
            return { ...user, roles: userRoles };
        }
        catch (error) {
            logger_1.default.error(error);
            throw new server_error_1.default("Error fecthing current user");
        }
    }
}
exports.default = GetAuthenticatedUserInfo;
//# sourceMappingURL=getAuthenticatedUserInfo.js.map