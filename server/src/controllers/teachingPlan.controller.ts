import { Request } from "express";

import HTTP_STATUS_CODES from "@utils/constants/httpStatusCodes";
import { createTeachingPlan, updateTeachingPlan } from "@useCases/teachingPlan";

export default function MakeTeachingPlanController() {
  const create = async (httpRequest: Partial<Request>) => {
    const teachingPlanData = await createTeachingPlan.execute(httpRequest.body);

    return { status: HTTP_STATUS_CODES.CREATED, data: teachingPlanData };
  };

  const update = async (httpRequest: Partial<Request>) => {
    const updatedTeachingPlan = await updateTeachingPlan.execute(
      Number(httpRequest.params?.id),
      httpRequest.body
    );

    return { status: HTTP_STATUS_CODES.OK, data: updatedTeachingPlan };
  };

  return Object.freeze({
    create,
    update,
  });
}
