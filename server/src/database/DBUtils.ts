import fs from "fs";

export default class DBUtils {
  static readSQLFile(path: string): string {
    return fs.readFileSync(path).toString();
  }
}
