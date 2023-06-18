import Departament from "@models/departament";
import { DepartamentQueryOpts } from "@useCases/departament/list";
import DEFAULT_PAGE_SIZE from "@utils/constants/paginationOptions";
import { FindManyOptions, getRepository } from "typeorm";

export default class DepartamentRepository {
  async save(departament: Departament) {
    const repository = getRepository(Departament);

    return repository.save(departament);
  }

  async findOne(id: number) {
    const repository = getRepository(Departament);

    return repository.findOne(id, {
      relations: ["teachers"],
    });
  }

  async findAll(query: DepartamentQueryOpts) {
    const repository = getRepository(Departament);

    const queryOptions: FindManyOptions<Departament> = {};

    if (query.page) {
      queryOptions.skip = query.page * DEFAULT_PAGE_SIZE;
      queryOptions.take = DEFAULT_PAGE_SIZE;
    }

    return repository.findAndCount(queryOptions);
  }
}
