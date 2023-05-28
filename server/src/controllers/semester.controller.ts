import { Request } from "express";
import { createSemester } from "@useCases/semester";
import HTTP_STATUS_CODES from "@utils/constants/httpStatusCodes";

export default function MakeSemesterController() {
  const create = async (httpRequest: Partial<Request>) => {
    const semesterData = await createSemester.create(httpRequest.body);

    return { status: HTTP_STATUS_CODES.CREATED, data: semesterData };
  };

  return Object.freeze({
    create,
  });
}
