import Logger from "@utils/logger";
import InternalServerError from "@errors/server.error";
import SubjectOfferRepository from "@dataAccess/subjectOffer.repository";

export default class GetOfferTeachers {
  constructor(private readonly repository: SubjectOfferRepository) {}

  async execute(offerId: number) {
    try {
      const teachers = await this.repository.getSubjectOfferTeachers(offerId);

      return teachers?.teachers || [];
    } catch (error: any) {
      Logger.error(error.message);
      throw new InternalServerError("Error fetching offer teachers");
    }
  }
}
