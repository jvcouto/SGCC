"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const httpStatusCodes_1 = __importDefault(require("../utils/constants/httpStatusCodes"));
const abstractCustom_error_1 = __importDefault(require("./abstractCustom.error"));
class Unauthorized extends abstractCustom_error_1.default {
    constructor() {
        super(...arguments);
        this.status = httpStatusCodes_1.default.UNAUTHORIZED;
        this.code = "NOT_AUTHORIZED";
    }
}
exports.default = Unauthorized;
//# sourceMappingURL=unauthorized.error.js.map