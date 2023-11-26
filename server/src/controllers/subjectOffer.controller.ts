import { Request } from "express";

import HTTP_STATUS_CODES from "@utils/constants/httpStatusCodes";
import {
  createSubjectOffer,
  requestSubjectOffer,
} from "@useCases/subjectOffer";

export default function MakeSubjectOfferController() {
  const create = async (httpRequest: Partial<Request>) => {
    const subjectOfferData = await createSubjectOffer.execute(httpRequest.body);

    return { status: HTTP_STATUS_CODES.CREATED, data: subjectOfferData };
  };

  const request = async (httpRequest: Partial<Request>) => {
    const requestData = await requestSubjectOffer.execute(
      httpRequest.params,
      httpRequest.user
    );

    return { status: HTTP_STATUS_CODES.OK, data: requestData };
  };

  return Object.freeze({
    create,
    request,
  });
}
