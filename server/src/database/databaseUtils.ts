import fs from "fs";

export default class DatabaseUtils {
  static readSQLFile(path: string): string {
    return fs.readFileSync(path).toString();
  }
}
