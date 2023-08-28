import Departament from "@models/departament";
import { DepartamentQueryOpts } from "@useCases/departament/list";
import { FindManyOptions, Like, getRepository } from "typeorm";

import {
  DEFAULT_PAGE_SIZE,
  MAX_TAKE_ITEMS,
} from "@utils/constants/paginationOptions";
export default class DepartamentRepository {
  async save(departament: Departament) {
    const repository = getRepository(Departament);

    return repository.save(departament);
  }

  async findOne(id: number) {
    const repository = getRepository(Departament);

    return repository.findOne(id, {
      relations: ["teachers", "admins", "admins.user"],
    });
  }

  async findAll(query: DepartamentQueryOpts) {
    const repository = getRepository(Departament);

    const queryOptions: FindManyOptions<Departament> = {};

    if (query.name) {
      queryOptions.where = {
        name: Like(`${query.name}%`),
      };
    }

    if (query.page) {
      queryOptions.skip = query.page * DEFAULT_PAGE_SIZE;
      queryOptions.take = DEFAULT_PAGE_SIZE;
    } else {
      queryOptions.take = MAX_TAKE_ITEMS;
    }

    return repository.findAndCount(queryOptions);
  }
}
