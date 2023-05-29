import { Request } from "express";

import HTTP_STATUS_CODES from "@utils/constants/httpStatusCodes";
import { createSubjectRequest } from "@useCases/subjectRequest";

export default function MakeSubjectRequestController() {
  const create = async (httpRequest: Partial<Request>) => {
    const subjectRequestData = await createSubjectRequest.create(
      httpRequest.body
    );

    return { status: HTTP_STATUS_CODES.CREATED, data: subjectRequestData };
  };

  return Object.freeze({
    create,
  });
}
