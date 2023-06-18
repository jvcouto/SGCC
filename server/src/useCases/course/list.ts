import Logger from "@utils/logger";
import InternalServerError from "@errors/server.error";
import CourseRepository from "@dataAccess/course.repository";

export default class FindAllCourses {
  constructor(private readonly repository: CourseRepository) {}

  async execute(query: unknown) {
    try {
      return await this.repository.findAll(query);
    } catch (error: any) {
      Logger.error(error.message);
      throw new InternalServerError("Error fechting courses");
    }
  }
}
