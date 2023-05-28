import { validate } from "class-validator";
import Logger from "@utils/logger";
import InvalidAttributeError from "@errors/invalidAttributeError";
import InternalServerError from "@errors/serverError";
import Semester from "@models/semester.model";

export default class CreateSemester {
  constructor(private readonly saveSemester: any) {}

  async create(semestarData: any) {
    const newSemester = Object.assign(new Semester(), semestarData);

    const errors = await validate(newSemester);

    if (errors.length > 0) {
      const formatedError = errors.map((error) => error.constraints);
      Logger.error(JSON.stringify(formatedError));
      throw new InvalidAttributeError("Error on semester creation");
    }

    try {
      return this.saveSemester(newSemester);
    } catch (error: any) {
      Logger.error(error.message);
      throw new InternalServerError("Error on semester creation");
    }
  }
}
