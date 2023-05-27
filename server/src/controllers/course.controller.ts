import { Request } from "express";

import HTTP_STATUS_CODES from "@utils/constants/httpStatusCodes";
import { createCourse } from "@useCases/course";

export default function MakeCourseController() {
  const create = async (httpRequest: Partial<Request>) => {
    const userData = await createCourse.create(httpRequest.body);

    return { status: HTTP_STATUS_CODES.CREATED, data: userData };
  };

  return Object.freeze({
    create,
  });
}
