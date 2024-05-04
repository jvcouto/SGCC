"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const httpStatusCodes_1 = __importDefault(require("../utils/constants/httpStatusCodes"));
const abstractCustom_error_1 = __importDefault(require("./abstractCustom.error"));
class OperationNotAllowed extends abstractCustom_error_1.default {
    constructor() {
        super(...arguments);
        this.status = httpStatusCodes_1.default.BAD_REQUEST;
        this.code = "NOT_ALLOWED";
    }
}
exports.default = OperationNotAllowed;
//# sourceMappingURL=operationNotAllowed.js.map