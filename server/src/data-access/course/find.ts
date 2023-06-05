import Course from "@models/course.model";
import { getRepository } from "typeorm";

const DEFAULT_PAGE_SIZE = 5;

export default async function findCourses(query: any) {
  const repository = getRepository(Course);

  return repository.findAndCount({
    skip: query.page * DEFAULT_PAGE_SIZE,
    take: DEFAULT_PAGE_SIZE,
  });
}
