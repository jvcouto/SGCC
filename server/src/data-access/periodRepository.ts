import { FindManyOptions, getRepository } from "typeorm";
import Period from "@models/period.model";
import DEFAULT_PAGE_SIZE from "@utils/constants/paginationOptions";

export default class PeriodRepository {
  async save(period: Period) {
    const repository = getRepository(Period);

    return repository.save(period);
  }

  async findOne(id: number) {
    const repository = getRepository(Period);

    return repository.findOne(id);
  }

  async findAll(query: any) {
    const repository = getRepository(Period);

    const queryOptions: FindManyOptions<Period> = {};

    if (query.page) {
      queryOptions.skip = query.page * DEFAULT_PAGE_SIZE;
      queryOptions.take = DEFAULT_PAGE_SIZE;
    }

    return repository.findAndCount(queryOptions);
  }
}
