import { Request } from "express";
import {
  createCourse,
  findCourse,
  listCourses,
  updateCourse,
  offerAllCourseRequiredSubjects,
} from "@useCases/course";

import HTTP_STATUS_CODES from "@utils/constants/httpStatusCodes";

export default function MakeCourseController() {
  const create = async (httpRequest: Partial<Request>) => {
    const courseData = await createCourse.execute(httpRequest.body);

    return { status: HTTP_STATUS_CODES.CREATED, data: courseData };
  };

  const list = async (httpRequest: Partial<Request>) => {
    const [data, count] = await listCourses.execute(httpRequest.query);

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
    const course = await findCourse.execute(
      httpRequest.params?.id as unknown as number
    );

    return { status: HTTP_STATUS_CODES.OK, data: course };
  };

  const update = async (httpRequest: Partial<Request>) => {
    const updatedCourse = await updateCourse.execute(
      Number(httpRequest.params?.id),
      httpRequest.body
    );

    return { status: HTTP_STATUS_CODES.OK, data: updatedCourse };
  };

  const offerAllRequiredSubjects = async (httpRequest: Partial<Request>) => {
    const subjectOffers = await offerAllCourseRequiredSubjects.execute(
      Number(httpRequest.params?.id),
      httpRequest.body
    );

    return { status: HTTP_STATUS_CODES.OK, data: subjectOffers };
  };

  return Object.freeze({
    create,
    list,
    findOne,
    update,
    offerAllRequiredSubjects,
  });
}
