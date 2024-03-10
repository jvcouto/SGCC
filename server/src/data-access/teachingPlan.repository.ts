import TeachingPlan from "@models/teachingPlan.model";
import { getRepository } from "typeorm";

export default class TeachingPlanRepository {
  async save(teachingPlan: TeachingPlan) {
    const repository = getRepository(TeachingPlan);

    return repository.save(teachingPlan);
  }

  async findById(id: number) {
    const repository = getRepository(TeachingPlan);

    return repository.findOne(id);
  }
}
