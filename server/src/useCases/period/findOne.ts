import EntityNotFound from "@errors/entityNotFound.error";
import PeriodRepository from "@dataAccess/period.repository";

export default class FindOnePeriod {
  constructor(private readonly repository: PeriodRepository) {}

  async execute(id: number) {
    const periodFound = await this.repository.findOne(id);

    if (!periodFound) throw new EntityNotFound("Period not found");

    return periodFound;
  }
}
