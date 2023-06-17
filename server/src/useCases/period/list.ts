import Logger from "@utils/logger";
import InternalServerError from "@errors/server.error";
import PeriodRepository from "@dataAccess/period.repository";

export default class FindAllPeriods {
  constructor(private readonly repository: PeriodRepository) {}

  async execute(query: any) {
    try {
      return await this.repository.findAll(query);
    } catch (error: any) {
      Logger.error(error.message);
      throw new InternalServerError("Error fechting period");
    }
  }
}
