"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const logger_1 = __importDefault(require("../utils/logger"));
class Database {
    static async createConnection() {
        const connection = await (0, typeorm_1.createConnection)();
        logger_1.default.info("TypeORM initialized!!");
        return connection;
    }
}
exports.default = Database;
//# sourceMappingURL=database.js.map