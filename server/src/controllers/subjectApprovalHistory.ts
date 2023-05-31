import { Request } from "express";
import HTTP_STATUS_CODES from "@utils/constants/httpStatusCodes";
import { createSubjectApprovalHistory } from "@useCases/subjectApprovalHistory";
import MissingParameterError from "@errors/missingParameter.error";
import Logger from "@utils/logger";

export default function MakeSubjectApprovalHistoryController() {
  const create = async (httpRequest: Partial<Request>) => {
    const { params } = httpRequest;

    if (!params?.id) {
      const errorMessage = "Missing subject offer parameter";
      Logger.info(errorMessage);
      throw new MissingParameterError(errorMessage);
    }

    const newSubjectApprovalHistoryData = {
      ...httpRequest.body,
      evaluator: {
        id: httpRequest.user?.id,
      },
      subjectOffer: {
        id: params.id,
      },
    };

    const subjectApprovalHistoryData =
      await createSubjectApprovalHistory.create(newSubjectApprovalHistoryData);

    return {
      status: HTTP_STATUS_CODES.CREATED,
      data: subjectApprovalHistoryData,
    };
  };

  return Object.freeze({
    create,
  });
}
