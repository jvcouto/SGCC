import DBConnection from "@config/DBConnection";
import Logger from "@utils/Logger";
import path from "path";
import DBUtils from "../DBUtils";

// eslint-disable-next-line no-void
void (async () => {
  Logger.info("Starting Database Populate!");
  const conn = await DBConnection.createConnection();
  const queryRunner = conn.createQueryRunner();
  const sql = DBUtils.readSQLFile(path.resolve(__dirname, "./Data.sql"));
  Logger.info(sql);
  await queryRunner.query(sql);
  Logger.info("Database Sucessfully Populated!");

  process.exit();
})();
