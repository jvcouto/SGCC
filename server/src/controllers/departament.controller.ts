import { Request } from "express";
import HTTP_STATUS_CODES from "@utils/constants/httpStatusCodes";
import {
  createDepartament,
  findOneDepartament,
  listDepartaments,
} from "@useCases/departament";

export default function MakeDepartamentController() {
  const create = async (httpRequest: Partial<Request>) => {
    const departamentData = await createDepartament.execute(httpRequest.body);

    return { status: HTTP_STATUS_CODES.CREATED, data: departamentData };
  };

  const list = async (httpRequest: Partial<Request>) => {
    const [data, count] = await listDepartaments.execute(httpRequest.query);

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
    const departament = await findOneDepartament.execute(
      httpRequest.params?.id as unknown as number
    );

    return {
      status: HTTP_STATUS_CODES.OK,
      data: departament,
    };
  };

  return Object.freeze({
    create,
    list,
    findOne,
  });
}
