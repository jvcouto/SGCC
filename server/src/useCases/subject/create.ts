import { validate } from "class-validator";
import Logger from "@utils/logger";
import InvalidAttributeError from "@errors/invalidAttribute.error";
import InternalServerError from "@errors/server.error";
import Subject from "@models/subject.model";

export default class CreateSubject {
  constructor(private readonly saveSubject: any) {}

  async create(subjectData: any) {
    const newSubject = Object.assign(new Subject(), subjectData);

    const errors = await validate(newSubject);

    if (errors.length > 0) {
      const formatedError = errors.map((error) => error.constraints);
      Logger.error(JSON.stringify(formatedError));
      throw new InvalidAttributeError("Error on subject creation");
    }

    try {
      return this.saveSubject(newSubject);
    } catch (error: any) {
      Logger.error(error.message);
      throw new InternalServerError("Error on subject creation");
    }
  }
}
