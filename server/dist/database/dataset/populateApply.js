"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../../config/database"));
const logger_1 = __importDefault(require("../../utils/logger"));
const path_1 = __importDefault(require("path"));
const databaseUtils_1 = __importDefault(require("../databaseUtils"));
void (async () => {
    logger_1.default.info("Starting Database Populate!");
    const conn = await database_1.default.createConnection();
    const queryRunner = conn.createQueryRunner();
    const sql = databaseUtils_1.default.readSQLFile(path_1.default.resolve(__dirname, "./data.sql"));
    logger_1.default.info(sql);
    await queryRunner.query(sql);
    logger_1.default.info("Database Sucessfully Populated!");
    process.exit();
})();
//# sourceMappingURL=populateApply.js.map