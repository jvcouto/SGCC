import { validate } from "class-validator";
import Logger from "@utils/logger";
import InvalidAttributeError from "@errors/invalidAttribute.error";
import InternalServerError from "@errors/server.error";
import SubjectApprovalHistory from "@models/subjectApprovalHistory.model";

export default class CreateSubjectApprovalHistory {
  constructor(private readonly saveSubjectApprovalHistory: any) {}

  async create(subjectApprovalHistoryData: any) {
    const newSubjectApprovalHistory = Object.assign(
      new SubjectApprovalHistory(),
      subjectApprovalHistoryData
    );

    const errors = await validate(newSubjectApprovalHistory);

    if (errors.length > 0) {
      const formatedError = errors.map((error) => error.constraints);
      Logger.error(JSON.stringify(formatedError));
      throw new InvalidAttributeError(
        "Error on subject approval history creation"
      );
    }

    try {
      const subjectApprovalHistoryCreated =
        await this.saveSubjectApprovalHistory(newSubjectApprovalHistory);
      return subjectApprovalHistoryCreated;
    } catch (error: any) {
      Logger.error(error.message);
      throw new InternalServerError(
        "Error on subject approval history creation"
      );
    }
  }
}
