import { ConnectionOptions, createConnection } from "typeorm";
import Logger from "@utils/logger";

const config = {
  type: "postgres",
  host: process.env.DB_HOST ?? "localhost",
  port: process.env.DB_PORT ?? 5432,
  username: process.env.DB_USER ?? "postgres",
  password: process.env.DB_PASSWORD ?? "postgres",
  database: process.env.DB_DATABASE ?? "postgres",
  entities:
    process.env.NODE_ENV === "PROD" ? [`**/models/*.js`] : ["src/models/*.ts"],
  migrations: ["src/database/migrations/*.ts"],
  synchronize: true,
  cli: {
    migrationsDir: "src/database/migrations",
    entitiesDir: "src/models",
  },
  url: process.env.DB_URL,
  extra:
    process.env.NODE_ENV === "PROD"
      ? {
          ssl: {
            rejectUnauthorized: false,
          },
        }
      : {},
} as ConnectionOptions;

class Database {
  static async createConnection() {
    const connection = await createConnection(config);
    Logger.info("TypeORM initialized!!");
    return connection;
  }
}

export default Database;
