import Logger from "@utils/logger";

import InternalServerError from "@errors/server.error";
import SubjectOfferRepository from "@dataAccess/subjectOffer.repository";
import MissingParameterError from "@errors/missingParameter.error";

export default class CloseOffers {
  constructor(private readonly repository: SubjectOfferRepository) {}

  async execute(data: any) {
    const {
      subjectsIds,
      periodId,
      close,
    }: { subjectsIds: number[]; periodId: number; close: boolean } = data;

    if (!subjectsIds.length) {
      throw new MissingParameterError("Subjects Ids is mandatory");
    }

    try {
      return await this.repository.closeSubjectsByPeriod(
        subjectsIds,
        periodId,
        close
      );
    } catch (error: any) {
      Logger.error(error.message);
      throw new InternalServerError("Error updating the subject offer");
    }
  }
}
