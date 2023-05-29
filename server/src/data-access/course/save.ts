import Course from "@models/course.model";
import { getRepository } from "typeorm";

export default async function saveCourse(course: Course) {
  const repository = getRepository(Course);

  return repository.save(course);
}
