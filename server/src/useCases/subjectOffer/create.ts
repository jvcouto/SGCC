import { validate } from "class-validator";
import Logger from "@utils/logger";
import InvalidAttributeError from "@errors/invalidAttribute.error";
import InternalServerError from "@errors/server.error";
import SubjectOffer from "@models/subjectOffer.model";
import SubjectOfferRepository from "@dataAccess/subjectOffer.repository";

export default class CreateSubjectOffer {
  constructor(private readonly repository: SubjectOfferRepository) {}

  async execute(subjectOfferData: any) {
    const subjectOffer = Object.assign(new SubjectOffer(), subjectOfferData);

    const errors = await validate(subjectOffer);

    if (errors.length > 0) {
      const formatedError = errors.map((error) => error.constraints);
      Logger.error(JSON.stringify(formatedError));
      throw new InvalidAttributeError("Error on subject offer creation");
    }

    try {
      const createdSubjectOffer = await this.repository.save(subjectOffer);
      return await this.repository.findByIds([createdSubjectOffer.id]);
    } catch (error: any) {
      Logger.error(error.message);
      throw new InternalServerError("Error on subject offer creation");
    }
  }
}
