import Course from "@models/course.model";
import { getRepository } from "typeorm";

export default async function save(course: Course) {
  const userRepository = getRepository(Course);

  return userRepository.save(course);
}
