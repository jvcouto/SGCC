import { validate } from "class-validator";
import Logger from "@utils/logger";
import InvalidAttributeError from "@errors/invalidAttribute.error";
import InternalServerError from "@errors/server.error";
import Period from "@models/period.model";
import PeriodRepository from "@dataAccess/period.repository";

export default class CreatePeriod {
  constructor(private readonly repository: PeriodRepository) {}

  async execute(periodData: any) {
    if (periodData.startDate)
      periodData.startDate = new Date(periodData.startDate);

    if (periodData.endDate) periodData.endDate = new Date(periodData.endDate);

    const newPeriod = Object.assign(new Period(), periodData);

    const errors = await validate(newPeriod);

    if (errors.length > 0) {
      const formatedError = errors.map((error) => error.constraints);
      Logger.error(JSON.stringify(formatedError));
      throw new InvalidAttributeError("Error on period creation");
    }

    try {
      return await this.repository.save(newPeriod);
    } catch (error: any) {
      Logger.error(error.message);
      throw new InternalServerError("Error on period creation");
    }
  }
}
