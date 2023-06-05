import Logger from "@utils/logger";
import InternalServerError from "@errors/server.error";
import Course from "@models/course.model";

export default class ListCourses {
  constructor(
    private readonly findCourses: (query: any) => Promise<[Course[], number]>
  ) {}

  async list(query: any) {
    try {
      return await this.findCourses(query);
    } catch (error: any) {
      Logger.error(error.message);
      throw new InternalServerError("Error fechting courses");
    }
  }
}
