import { validate } from "class-validator";
import Logger from "@utils/logger";

import EntityNotFound from "@errors/entityNotFound.error";
import InvalidAttributeError from "@errors/invalidAttribute.error";
import InternalServerError from "@errors/server.error";
import TeachingPlan from "@models/teachingPlan.model";
import TeachingPlanRepository from "@dataAccess/teachingPlan.repository";

export default class UpdateTeachingPlan {
  constructor(private readonly repository: TeachingPlanRepository) {}

  async execute(id: number | undefined, updateData: any) {
    const teachingPlan = await this.repository.findById(Number(id));

    if (!teachingPlan) {
      const errorMessage = "Teaching Plan not found!";
      Logger.error(errorMessage);
      throw new EntityNotFound(errorMessage);
    }

    const teachingPlanUpdated = Object.assign(new TeachingPlan(), {
      id,
      ...updateData,
    }) as TeachingPlan;

    const errors = await validate(teachingPlanUpdated, {
      skipUndefinedProperties: true,
    });

    if (errors.length > 0) {
      const formatedError = errors.map((error) => error.constraints);
      Logger.error(JSON.stringify(formatedError));
      throw new InvalidAttributeError("Error updating teaching plan");
    }

    try {
      const updatedTeachingPlan = await this.repository.save(
        teachingPlanUpdated
      );
      return await this.repository.findById(updatedTeachingPlan.id);
    } catch (error: any) {
      Logger.error(error.message);
      throw new InternalServerError("Error updating teaching plan");
    }
  }
}
