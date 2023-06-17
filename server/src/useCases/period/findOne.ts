import Logger from "@utils/logger";
import InternalServerError from "@errors/server.error";
import EntityNotFound from "@errors/entityNotFound.error";
import PeriodRepository from "@dataAccess/period.repository";

export default class FindOnePeriod {
  constructor(private readonly repository: PeriodRepository) {}

  async execute(id: number) {
    try {
      const periodFound = await this.repository.findOne(id);

      if (!periodFound) throw new EntityNotFound("Period not found");

      return periodFound;
    } catch (error: any) {
      Logger.error(error.message);
      throw new InternalServerError("Error fechting period");
    }
  }
}
