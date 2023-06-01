import { Request } from "express";
import { createSemester, listSemesters } from "@useCases/semester";
import HTTP_STATUS_CODES from "@utils/constants/httpStatusCodes";

export default function MakeSemesterController() {
  const create = async (httpRequest: Partial<Request>) => {
    const semesterData = await createSemester.create(httpRequest.body);

    return { status: HTTP_STATUS_CODES.CREATED, data: semesterData };
  };

  const list = async (httpRequest: Partial<Request>) => {
    const semestersData = await listSemesters.list();

    return { status: HTTP_STATUS_CODES.CREATED, data: semestersData };
  };

  return Object.freeze({
    create,
    list,
  });
}
