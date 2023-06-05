import Course from "@models/course.model";
import { getRepository } from "typeorm";

export default async function findOneCourse(id: number) {
  const repository = getRepository(Course);

  return repository.findOne(id, {
    relations: ["collegeMembers", "teachers", "admins", "subjects"],
  });
}
