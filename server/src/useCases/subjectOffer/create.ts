import { validate } from "class-validator";
import Logger from "@utils/logger";
import InvalidAttributeError from "@errors/invalidAttributeError";
import InternalServerError from "@errors/serverError";
import SubjectOffer from "@models/subjectOffer.model";

export default class CreateSubjectOffer {
  constructor(private readonly saveSubjectOffer: any) {}

  async create(subjectOfferData: any) {
    const newOfferSubject = Object.assign(new SubjectOffer(), subjectOfferData);

    const errors = await validate(newOfferSubject);

    if (errors.length > 0) {
      const formatedError = errors.map((error) => error.constraints);
      Logger.error(JSON.stringify(formatedError));
      throw new InvalidAttributeError("Error on subject offer creation");
    }

    try {
      return this.saveSubjectOffer(newOfferSubject);
    } catch (error: any) {
      Logger.error(error.message);
      throw new InternalServerError("Error on subject offer creation");
    }
  }
}
