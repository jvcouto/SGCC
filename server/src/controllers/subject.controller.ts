import { Request } from "express";

import HTTP_STATUS_CODES from "@utils/constants/httpStatusCodes";
import { createSubject, listSubjects } from "@useCases/subject";

export default function MakeSubjectController() {
  const create = async (httpRequest: Partial<Request>) => {
    const subjectData = await createSubject.execute(httpRequest.body);

    return { status: HTTP_STATUS_CODES.CREATED, data: subjectData };
  };

  const list = async (httpRequest: Partial<Request>) => {
    const [data, count] = await listSubjects.execute(httpRequest.query);

    return {
      status: HTTP_STATUS_CODES.OK,
      data: data,
      meta: {
        total: count,
        page: httpRequest.query?.page,
        pageSize: httpRequest.query?.page_size,
      },
    };
  };

  return Object.freeze({
    create,
    list,
  });
}
