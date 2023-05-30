import { validate } from "class-validator";
import Logger from "@utils/logger";
import InvalidAttributeError from "@errors/invalidAttribute.error";
import InternalServerError from "@errors/server.error";
import Course from "@models/course.model";

export default class CreateCourse {
  constructor(private readonly saveCourse: any) {}

  async create(courseData: any) {
    const newCourse = Object.assign(new Course(), courseData);

    const errors = await validate(newCourse);

    if (errors.length > 0) {
      const formatedError = errors.map((error) => error.constraints);
      Logger.error(JSON.stringify(formatedError));
      throw new InvalidAttributeError("Error on course creation");
    }

    try {
      return this.saveCourse(newCourse);
    } catch (error: any) {
      Logger.error(error.message);
      throw new InternalServerError("Error on course creation");
    }
  }
}
