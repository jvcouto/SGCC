import { validate } from "class-validator";
import Logger from "@utils/logger";

import EntityNotFound from "@errors/entityNotFound.error";
import InvalidAttributeError from "@errors/invalidAttribute.error";
import InternalServerError from "@errors/server.error";
import CourseRepository from "@dataAccess/course.repository";
import Course from "@models/course.model";

export default class UpdateCourse {
  constructor(private readonly repository: CourseRepository) {}

  async execute(id: number | undefined, courseData: any) {
    const course = await this.repository.findOne(id as number);

    if (!course) {
      const errorMessage = "Course not found!";
      Logger.error(errorMessage);
      throw new EntityNotFound(errorMessage);
    }

    const updatedFields = Object.assign(new Course(), {
      id,
      ...courseData,
    }) as Course;

    if (updatedFields?.collegeMembers?.length) {
      updatedFields.collegeMembers = [
        ...updatedFields.collegeMembers,
        ...course.collegeMembers,
      ];
    }

    const errors = await validate(updatedFields, {
      skipUndefinedProperties: true,
    });

    if (errors.length > 0) {
      const formatedError = errors.map((error) => error.constraints);
      Logger.error(JSON.stringify(formatedError));
      throw new InvalidAttributeError("Error updating course");
    }

    try {
      const updatedCourse = await this.repository.save(updatedFields);
      return await this.repository.findOne(updatedCourse.id);
    } catch (error: any) {
      Logger.error(error.message);
      throw new InternalServerError("Error updating the course");
    }
  }
}
