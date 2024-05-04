"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../../utils/logger"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticateFail_error_1 = __importDefault(require("../../errors/authenticateFail.error"));
const userRoles_1 = require("../../utils/constants/userRoles");
class AuthenticateUser {
    constructor(repository) {
        this.repository = repository;
    }
    _getUserRoles(user) {
        const userRoles = [];
        if (user.courseAdmin.length)
            userRoles.push(userRoles_1.UserRoles.COURSE_ADMIN);
        if (user.colleges.length)
            userRoles.push(userRoles_1.UserRoles.COLLEGE_MEMBER);
        if (user.departament)
            userRoles.push(userRoles_1.UserRoles.TEACHER);
        if (user.sysAdmin)
            userRoles.push(userRoles_1.UserRoles.SYSTEM_ADMIN);
        if (user.departamentAdmin.length)
            userRoles.push(userRoles_1.UserRoles.DEPARTAMENT_ADMIN);
        return userRoles;
    }
    async execute(email, password) {
        const user = (await this.repository.findOne(email, "email"));
        if (!user) {
            const message = "User not found";
            logger_1.default.info(message);
            throw new authenticateFail_error_1.default(message);
        }
        const { password: userPassword } = (await this.repository.getUserPassword(user.id));
        const userRoles = this._getUserRoles(user);
        if (await bcryptjs_1.default.compare(password, userPassword)) {
            const token = jsonwebtoken_1.default.sign({ id: user.id, userRoles: userRoles }, process.env.JWT_TOKEN, {
                expiresIn: process.env.JWT_EXPIRE,
            });
            const resData = {
                id: user.id,
                name: user.name,
                email: user.email,
                roles: userRoles,
                token,
            };
            return resData;
        }
        const message = "Wrong username or password";
        logger_1.default.info(message);
        throw new authenticateFail_error_1.default(message);
    }
}
exports.default = AuthenticateUser;
//# sourceMappingURL=authenticate.js.map