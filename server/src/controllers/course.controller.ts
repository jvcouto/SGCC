import { Request } from "express";
import { createCourse } from "@useCases/course";

import HTTP_STATUS_CODES from "@utils/constants/httpStatusCodes";

export default function MakeCourseController() {
  const create = async (httpRequest: Partial<Request>) => {
    const courseData = await createCourse.create(httpRequest.body);

    return { status: HTTP_STATUS_CODES.CREATED, data: courseData };
  };

  return Object.freeze({
    create,
  });
}
