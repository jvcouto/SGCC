import { Request } from "express";

import HTTP_STATUS_CODES from "@utils/constants/httpStatusCodes";
import { createSubjectOffer } from "@useCases/subjectOffer";

export default function MakeSubjectOfferController() {
  const create = async (httpRequest: Partial<Request>) => {
    const subjectOfferData = await createSubjectOffer.create(httpRequest.body);

    return { status: HTTP_STATUS_CODES.CREATED, data: subjectOfferData };
  };

  return Object.freeze({
    create,
  });
}
