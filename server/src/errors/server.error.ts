import HTTP_STATUS_CODES from "@utils/constants/httpStatusCodes";
import GenericCustomError from "./abstractCustom.error";

export default class InternalServerError extends GenericCustomError {
  status = HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR;

  code = "INTERNAL_SERVER_ERROR";
}
