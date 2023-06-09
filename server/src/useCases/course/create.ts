import { validate } from "class-validator";
import Logger from "@utils/logger";
import InvalidAttributeError from "@errors/invalidAttribute.error";
import InternalServerError from "@errors/server.error";
import Course from "@models/course.model";
import CourseRepository from "@dataAccess/course.repository";

export default class CreateCourse {
  constructor(private readonly repository: CourseRepository) {}

  async execute(courseData: any) {
    const newCourse = Object.assign(new Course(), courseData);

    const errors = await validate(newCourse);

    if (errors.length > 0) {
      const formatedError = errors.map((error) => error.constraints);
      Logger.error(JSON.stringify(formatedError));
      throw new InvalidAttributeError("Error on course creation");
    }

    try {
      return await this.repository.save(newCourse);
    } catch (error: any) {
      Logger.error(error);
      throw new InternalServerError("Error on course creation");
    }
  }
}
