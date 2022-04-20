import { createConnection } from "typeorm";
import Logger from "@utils/Logger";

class DBConnection {
  static async createConnection() {
    const connection = await createConnection();
    Logger.info("TypeORM initialized!!");
    return connection;
  }
}

export default DBConnection;
