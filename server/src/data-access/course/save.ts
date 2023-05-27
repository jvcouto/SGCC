import Course from "@models/course.model";
import { getRepository } from "typeorm";

export default async function saveCourse(course: Course) {
  const userRepository = getRepository(Course);

  return userRepository.save(course);
}
