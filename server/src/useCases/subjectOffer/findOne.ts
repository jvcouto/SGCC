import EntityNotFound from "@errors/entityNotFound.error";
import SubjectOfferRepository from "@dataAccess/subjectOffer.repository";
import { IUser } from "src/interfaces/user.interface";
import Logger from "@utils/logger";
import InternalServerError from "@errors/server.error";

export default class FindOneSubjectOffer {
  constructor(private readonly repository: SubjectOfferRepository) {}

  async execute(id: number, user: IUser) {
    try {
      const subjectOffer = await this.repository.findOneWithTeachingPlan(
        id,
        user
      );

      if (!subjectOffer) throw new EntityNotFound("Subject Offer not found");

      return subjectOffer;
    } catch (error: any) {
      Logger.error(error.message);
      throw new InternalServerError("Error getting Subject Offer");
    }
  }
}
