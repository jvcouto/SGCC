import Semester from "@models/semester.model";
import { FindManyOptions, getRepository } from "typeorm";

import DEFAULT_PAGE_SIZE from "@utils/constants/paginationOptions";

export default async function findSemesters(query: any) {
  const repository = getRepository(Semester);

  const queryOptions: FindManyOptions<Semester> = {};

  if (query.page) {
    queryOptions.skip = query.page * DEFAULT_PAGE_SIZE;
    queryOptions.take = DEFAULT_PAGE_SIZE;
  }

  return repository.findAndCount(queryOptions);
}
