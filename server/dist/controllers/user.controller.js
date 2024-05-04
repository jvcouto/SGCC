"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = require("../useCases/users");
const httpStatusCodes_1 = __importDefault(require("../utils/constants/httpStatusCodes"));
const logger_1 = __importDefault(require("../utils/logger"));
const notAuthenticated_error_1 = __importDefault(require("../errors/notAuthenticated.error"));
function MakeUserController() {
    const authenticate = async (httpRequest) => {
        const { email, password } = httpRequest.body;
        const userData = await users_1.authenticateUser.execute(email, password);
        return { status: httpStatusCodes_1.default.OK, data: userData };
    };
    const register = async (httpRequest) => {
        const userData = await users_1.registerUser.execute(httpRequest.body);
        return { status: httpStatusCodes_1.default.CREATED, data: userData };
    };
    const update = async (httpRequest) => {
        const userData = await users_1.updateUser.execute(httpRequest.params?.id, httpRequest.body);
        return { status: httpStatusCodes_1.default.OK, data: userData };
    };
    const bulkUpdate = async (httpRequest) => {
        const userData = await users_1.bulkUpdateUsers.execute(httpRequest.body?.ids, httpRequest.body?.data);
        return { status: httpStatusCodes_1.default.OK, data: userData };
    };
    const getCurrentUser = async (httpRequest) => {
        if (!httpRequest.headers?.authorization) {
            const message = "Token not provided";
            logger_1.default.error(message);
            throw new notAuthenticated_error_1.default("Token not found");
        }
        const token = httpRequest.headers?.authorization
            ?.replace("Bearer", "")
            .trim();
        const userData = await users_1.getAuthenticatedUserInfo.execute(token);
        return { status: httpStatusCodes_1.default.OK, data: userData };
    };
    const list = async (httpRequest) => {
        const [data, count] = await users_1.listUsers.execute(httpRequest.query);
        return {
            status: httpStatusCodes_1.default.OK,
            data: data,
            meta: {
                total: count,
                page: httpRequest.query?.page,
                pageSize: httpRequest.query?.page_size,
            },
        };
    };
    return Object.freeze({
        authenticate,
        register,
        update,
        getCurrentUser,
        list,
        bulkUpdate,
    });
}
exports.default = MakeUserController;
//# sourceMappingURL=user.controller.js.map