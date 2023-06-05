import Logger from "@utils/logger";
import InternalServerError from "@errors/server.error";
import Course from "@models/course.model";
import EntityNotFound from "@errors/entityNotFound.error";

export default class FindCourse {
  constructor(
    private readonly findOneCourse: (id: number) => Promise<Course | undefined>
  ) {}

  async findOne(id: number) {
    try {
      const courseFound = await this.findOneCourse(id);

      if (!courseFound) throw new EntityNotFound("Course not found");

      return courseFound;
    } catch (error: any) {
      Logger.error(error.message);
      throw new InternalServerError("Error fechting course");
    }
  }
}
