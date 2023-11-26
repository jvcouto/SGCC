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

  async findOne(id: number, query?: any) {
    const repository = getRepository(Departament);

    const queryrun = repository
      .createQueryBuilder("departament")
      .leftJoinAndSelect("departament.teachers", "teachers")
      .leftJoinAndSelect("departament.admins", "admins")
      .leftJoinAndSelect("admins.user", "user")
      .leftJoinAndSelect("departament.subjects", "subjects")
      .leftJoinAndSelect("subjects.course", "course")
      .leftJoinAndSelect(
        "subjects.offers",
        "offers",
        query?.period && `offers.period.id = ${query.period}`
      )
      .leftJoinAndSelect("offers.period", "period")
      .leftJoinAndSelect("offers.teachers", "offerTeachers")
      .where("departament.id = :id", { id: id });

    return queryrun.getOne();
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
