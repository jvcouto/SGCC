"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bulkUpdateUsers = exports.listUsers = exports.getAuthenticatedUserInfo = exports.updateUser = exports.registerUser = exports.authenticateUser = void 0;
const authenticate_1 = __importDefault(require("./authenticate"));
const register_1 = __importDefault(require("./register"));
const update_1 = __importDefault(require("./update"));
const getAuthenticatedUserInfo_1 = __importDefault(require("./getAuthenticatedUserInfo"));
const list_1 = __importDefault(require("./list"));
const bulkUpdate_1 = __importDefault(require("./bulkUpdate"));
const user_repository_1 = __importDefault(require("../../data-access/user.repository"));
const userRepository = new user_repository_1.default();
const authenticateUser = new authenticate_1.default(userRepository);
exports.authenticateUser = authenticateUser;
const registerUser = new register_1.default(userRepository);
exports.registerUser = registerUser;
const updateUser = new update_1.default(userRepository);
exports.updateUser = updateUser;
const getAuthenticatedUserInfo = new getAuthenticatedUserInfo_1.default(userRepository);
exports.getAuthenticatedUserInfo = getAuthenticatedUserInfo;
const listUsers = new list_1.default(userRepository);
exports.listUsers = listUsers;
const bulkUpdateUsers = new bulkUpdate_1.default(userRepository);
exports.bulkUpdateUsers = bulkUpdateUsers;
//# sourceMappingURL=index.js.map