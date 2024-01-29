import { validate } from "class-validator";
import Logger from "@utils/logger";

import EntityNotFound from "@errors/entityNotFound.error";
import InvalidAttributeError from "@errors/invalidAttribute.error";
import InternalServerError from "@errors/server.error";
import SubjectOffer from "@models/subjectOffer.model";
import SubjectOfferRepository from "@dataAccess/subjectOffer.repository";

export default class UpdateSubjectOffer {
  constructor(private readonly repository: SubjectOfferRepository) {}

  async execute(id: number | undefined, updateData: any) {
    const subejctOffer = await this.repository.findOne(id as number);

    if (!subejctOffer) {
      const errorMessage = "Subejct Offer not found!";
      Logger.error(errorMessage);
      throw new EntityNotFound(errorMessage);
    }

    const subejctOfferUpdated = Object.assign(new SubjectOffer(), {
      id,
      ...updateData,
    }) as SubjectOffer;

    const errors = await validate(subejctOfferUpdated, {
      skipUndefinedProperties: true,
    });

    if (errors.length > 0) {
      const formatedError = errors.map((error) => error.constraints);
      Logger.error(JSON.stringify(formatedError));
      throw new InvalidAttributeError("Error updating Subejct Offer");
    }

    try {
      const updatedSubjectOffer = await this.repository.save(
        subejctOfferUpdated
      );
      return await this.repository.findOne(updatedSubjectOffer.id);
    } catch (error: any) {
      Logger.error(error.message);
      throw new InternalServerError("Error updating the subject offer");
    }
  }
}
