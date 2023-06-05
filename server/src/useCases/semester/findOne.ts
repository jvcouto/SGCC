import Semester from "@models/semester.model";

import Logger from "@utils/logger";
import InternalServerError from "@errors/server.error";
import EntityNotFound from "@errors/entityNotFound.error";

export default class FindSemester {
  constructor(
    private readonly findOneSemester: (
      id: number
    ) => Promise<Semester | undefined>
  ) {}

  async findOne(id: number) {
    try {
      const semesterFound = await this.findOneSemester(id);

      if (!semesterFound) throw new EntityNotFound("Semester not found");

      return semesterFound;
    } catch (error: any) {
      Logger.error(error.message);
      throw new InternalServerError("Error fechting semester");
    }
  }
}
