import Course from "@models/course.model";
import { FindManyOptions, getRepository } from "typeorm";

import {
  DEFAULT_PAGE_SIZE,
  MAX_TAKE_ITEMS,
} from "@utils/constants/paginationOptions";

export default class CourseRepository {
  async findAll(query: any) {
    const repository = getRepository(Course);

    const queryOptions: FindManyOptions<Course> = {};

    if (query.page) {
      queryOptions.skip = query.page * DEFAULT_PAGE_SIZE;
      queryOptions.take = DEFAULT_PAGE_SIZE;
    } else {
      queryOptions.take = MAX_TAKE_ITEMS;
    }

    return repository.findAndCount(queryOptions);
  }

  async findOne(id: number) {
    const repository = getRepository(Course);

    return repository.findOne(id, {
      relations: ["collegeMembers", "admins", "subjects", "admins.user"],
    });
  }

  async save(data: Course) {
    const repository = getRepository(Course);

    if (data.admins && data.admins.length) {
      data.admins.forEach((admin) => {
        admin.createdAt = new Date();
      });
    }

    return repository.save(data);
  }
}
