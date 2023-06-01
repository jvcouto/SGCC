import Logger from "@utils/logger";
import InternalServerError from "@errors/server.error";
import Semester from "@models/semester.model";

export default class ListSemesters {
  constructor(private readonly findSemesters: () => Promise<Semester[]>) {}

  async list() {
    try {
      return await this.findSemesters();
    } catch (error: any) {
      Logger.error(error.message);
      throw new InternalServerError("Error fechting semesters");
    }
  }
}
