"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const logger_1 = __importDefault(require("../utils/logger"));
const config = {
    type: "postgres",
    host: process.env.DB_HOST ?? "localhost",
    port: process.env.DB_PORT ?? 5432,
    username: process.env.DB_USER ?? "postgres",
    password: process.env.DB_PASSWORD ?? "postgres",
    database: process.env.DB_DATABASE ?? "postgres",
    entities: ["src/models/*.ts"],
    migrations: ["src/database/migrations/*.ts"],
    synchronize: true,
    cli: {
        migrationsDir: "src/database/migrations",
        entitiesDir: "src/models",
    },
};
class Database {
    static async createConnection() {
        const connection = await (0, typeorm_1.createConnection)(config);
        logger_1.default.info("TypeORM initialized!!");
        return connection;
    }
}
exports.default = Database;
//# sourceMappingURL=database.js.map