import { validate } from "class-validator";
import Logger from "@utils/logger";
import InvalidAttributeError from "@errors/invalidAttribute.error";
import InternalServerError from "@errors/server.error";
import Subject from "@models/subject.model";
import SubjectRepository from "@dataAccess/subject.repository";

export default class CreateSubject {
  constructor(private readonly repository: SubjectRepository) {}

  async execute(subjectData: any) {
    const newSubjectData = Object.assign(new Subject(), subjectData);

    const errors = await validate(newSubjectData);

    if (errors.length > 0) {
      const formatedError = errors.map((error) => error.constraints);
      Logger.error(JSON.stringify(formatedError));
      throw new InvalidAttributeError("Error on subject creation");
    }

    try {
      const newSubject = await this.repository.save(newSubjectData);
      return await this.repository.findOne(newSubject.id);
    } catch (error: any) {
      Logger.error(error.message);
      throw new InternalServerError("Error on subject creation");
    }
  }
}
