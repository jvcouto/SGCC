import { validate } from "class-validator";
import Logger from "@utils/logger";
import InvalidAttributeError from "@errors/invalidAttribute.error";
import InternalServerError from "@errors/server.error";
import DuplicatedEntityError from "@errors/duplicatedEntity.error";
import TeachingPlanRepository from "@dataAccess/teachingPlan.repository";
import TeachingPlan from "@models/teachingPlan.model";

export default class CreateTeachingPlan {
  constructor(private readonly repository: TeachingPlanRepository) {}

  async execute(subjectOfferData: any) {
    const teachingPlan = Object.assign(new TeachingPlan(), subjectOfferData);

    const errors = await validate(teachingPlan);

    if (errors.length > 0) {
      const formatedError = errors.map((error) => error.constraints);
      Logger.error(JSON.stringify(formatedError));
      throw new InvalidAttributeError("Error on teaching plan creation");
    }

    try {
      const createdSubjectOffer = await this.repository.save(teachingPlan);
      return await this.repository.findById(createdSubjectOffer.id);
    } catch (error: any) {
      if (error.routine === "_bt_check_unique") {
        Logger.error(error.message);
        throw new DuplicatedEntityError("Duplicated teaching plan");
      }
      Logger.error(error.message);
      throw new InternalServerError("Error on teaching plan creation");
    }
  }
}
