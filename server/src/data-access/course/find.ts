import Course from "@models/course.model";
import { FindManyOptions, getRepository } from "typeorm";

import DEFAULT_PAGE_SIZE from "@utils/constants/paginationOptions";

export default async function findCourses(query: any) {
  const repository = getRepository(Course);

  const queryOptions: FindManyOptions<Course> = {};

  if (query.page) {
    queryOptions.skip = query.page * DEFAULT_PAGE_SIZE;
    queryOptions.take = DEFAULT_PAGE_SIZE;
  }

  return repository.findAndCount(queryOptions);
}
