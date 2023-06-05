import { Request } from "express";
import {
  createSemester,
  findSemester,
  listSemesters,
} from "@useCases/semester";
import HTTP_STATUS_CODES from "@utils/constants/httpStatusCodes";

export default function MakeSemesterController() {
  const create = async (httpRequest: Partial<Request>) => {
    const semesterData = await createSemester.create(httpRequest.body);

    return { status: HTTP_STATUS_CODES.CREATED, data: semesterData };
  };

  const list = async (httpRequest: Partial<Request>) => {
    const [data, count] = await listSemesters.list(httpRequest.query);

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

  const findOne = async (httpRequest: Partial<Request>) => {
    const course = await findSemester.findOne(
      httpRequest.params?.id as unknown as number
    );

    return { status: HTTP_STATUS_CODES.OK, data: course };
  };

  return Object.freeze({
    create,
    list,
    findOne,
  });
}
