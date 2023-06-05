import Logger from "@utils/logger";
import InternalServerError from "@errors/server.error";
import Semester from "@models/semester.model";

export default class ListSemesters {
  constructor(
    private readonly findSemesters: (
      query: any
    ) => Promise<[Semester[], number]>
  ) {}

  async list(query: any) {
    try {
      return await this.findSemesters(query);
    } catch (error: any) {
      Logger.error(error.message);
      throw new InternalServerError("Error fechting semesters");
    }
  }
}
