import { createConnection } from "typeorm";
import Logger from "@utils/logger";

class Database {
  static async createConnection() {
    const connection = await createConnection();
    Logger.info("TypeORM initialized!!");
    return connection;
  }
}

export default Database;
