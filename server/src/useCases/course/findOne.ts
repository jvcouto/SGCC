import Logger from "@utils/logger";
import InternalServerError from "@errors/server.error";
import EntityNotFound from "@errors/entityNotFound.error";
import CourseRepository from "@dataAccess/course.repository";

export default class FindOneCourse {
  constructor(private readonly repository: CourseRepository) {}

  async execute(id: number) {
    try {
      const courseFound = await this.repository.findOne(id);

      if (!courseFound) throw new EntityNotFound("Course not found");

      return courseFound;
    } catch (error: any) {
      Logger.error(error.message);
      throw new InternalServerError("Error fechting course");
    }
  }
}
