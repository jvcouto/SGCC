import { validate } from "class-validator";
import Logger from "@utils/logger";
import InvalidAttributeError from "@errors/invalidAttribute.error";
import InternalServerError from "@errors/server.error";
import Subject from "@models/subject.model";
import SubjectRepository from "@dataAccess/subject.repository";
import DuplicatedEntityError from "@errors/duplicatedEntity.error";

export default class CreateSubject {
  constructor(private readonly repository: SubjectRepository) {}

  async execute(subjectData: any) {
    if (subjectData.curriculum)
      subjectData.curriculum = new Date(subjectData.curriculum);

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
      if (error.routine === "_bt_check_unique") {
        Logger.error(error.message);
        throw new DuplicatedEntityError(
          "Subject already exists for this course and curriculum year"
        );
      }
      Logger.error(error.message);
      throw new InternalServerError("Error on subject creation");
    }
  }
}
