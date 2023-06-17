import EntityNotFound from "@errors/entityNotFound.error";
import CourseRepository from "@dataAccess/course.repository";

export default class FindOneCourse {
  constructor(private readonly repository: CourseRepository) {}

  async execute(id: number) {
    const courseFound = await this.repository.findOne(id);

    if (!courseFound) throw new EntityNotFound("Course not found");

    return courseFound;
  }
}
