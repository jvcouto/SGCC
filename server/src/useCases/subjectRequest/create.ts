import { validate } from "class-validator";
import Logger from "@utils/logger";
import InvalidAttributeError from "@errors/invalidAttributeError";
import InternalServerError from "@errors/serverError";
import SubjectRequest from "@models/subjectResquest.model";

export default class CreateSubjectRequest {
  constructor(private readonly saveSubjectRequest: any) {}

  async create(subjectRequestData: any) {
    const newRequestSubject = Object.assign(
      new SubjectRequest(),
      subjectRequestData
    );

    const errors = await validate(newRequestSubject);

    if (errors.length > 0) {
      const formatedError = errors.map((error) => error.constraints);
      Logger.error(JSON.stringify(formatedError));
      throw new InvalidAttributeError("Error on subject request creation");
    }

    try {
      return this.saveSubjectRequest(newRequestSubject);
    } catch (error: any) {
      Logger.error(error.message);
      throw new InternalServerError("Error on subject request creation");
    }
  }
}
