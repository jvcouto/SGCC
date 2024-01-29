import { Request } from "express";

import HTTP_STATUS_CODES from "@utils/constants/httpStatusCodes";
import {
  createSubjectOffer,
  deleteSubjectRequest,
  requestSubjectOffer,
  updateSubjectOffer,
  closeSubjectOffer,
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

  const deleteRequest = async (httpRequest: Partial<Request>) => {
    const requestData = await deleteSubjectRequest.execute(
      httpRequest.params,
      httpRequest.body,
      httpRequest.user
    );

    return { status: HTTP_STATUS_CODES.OK, data: requestData };
  };

  const update = async (httpRequest: Partial<Request>) => {
    const responseData = await updateSubjectOffer.execute(
      httpRequest.params?.offerUid as unknown as number,
      httpRequest.body
    );

    return { status: HTTP_STATUS_CODES.OK, data: responseData };
  };

  const close = async (httpRequest: Partial<Request>) => {
    console.log("opa");
    await closeSubjectOffer.execute(httpRequest.body);

    return { status: HTTP_STATUS_CODES.OK };
  };
  return Object.freeze({
    create,
    request,
    deleteRequest,
    update,
    close,
  });
}
