"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const httpStatusCodes_1 = __importDefault(require("../utils/constants/httpStatusCodes"));
const abstractCustom_error_1 = __importDefault(require("./abstractCustom.error"));
class AuthenticateFailError extends abstractCustom_error_1.default {
    constructor(message, code) {
        super(message);
        this.code = "WRONG_CREDENCIALS";
        this.status = httpStatusCodes_1.default.UNAUTHORIZED;
        if (code) {
            this.code = code;
        }
    }
}
exports.default = AuthenticateFailError;
//# sourceMappingURL=authenticateFail.error.js.map