import { Request } from "express";

import HTTP_STATUS_CODES from "@utils/constants/httpStatusCodes";
import { createPeriod, findPeriod, listPeriods } from "@useCases/period";

export default function MakePeriodController() {
  const create = async (httpRequest: Partial<Request>) => {
    const periodData = await createPeriod.execute(httpRequest.body);

    return { status: HTTP_STATUS_CODES.CREATED, data: periodData };
  };

  const list = async (httpRequest: Partial<Request>) => {
    const [data, count] = await listPeriods.execute(httpRequest.query);

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
    const course = await findPeriod.execute(
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
