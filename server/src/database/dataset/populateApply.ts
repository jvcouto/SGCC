import DBConnection from "@config/database";
import Logger from "@utils/logger";
import path from "path";
import DatabaseUtils from "../databaseUtils";

// eslint-disable-next-line no-void
void (async () => {
  Logger.info("Starting Database Populate!");
  const conn = await DBConnection.createConnection();
  const queryRunner = conn.createQueryRunner();
  const sql = DatabaseUtils.readSQLFile(path.resolve(__dirname, "./data.sql"));
  Logger.info(sql);
  await queryRunner.query(sql);
  Logger.info("Database Sucessfully Populated!");

  process.exit();
})();
