import { Request } from "express";

import HTTP_STATUS_CODES from "@utils/constants/httpStatusCodes";
import { createSubject } from "@useCases/subject";

export default function MakeSubjectController() {
  const create = async (httpRequest: Partial<Request>) => {
    const subjectData = await createSubject.create(httpRequest.body);

    return { status: HTTP_STATUS_CODES.CREATED, data: subjectData };
  };

  return Object.freeze({
    create,
  });
}
