"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
class DatabaseUtils {
    static readSQLFile(path) {
        return fs_1.default.readFileSync(path).toString();
    }
}
exports.default = DatabaseUtils;
//# sourceMappingURL=databaseUtils.js.map