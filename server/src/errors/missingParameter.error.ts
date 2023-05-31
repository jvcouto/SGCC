import HTTP_STATUS_CODES from "@utils/constants/httpStatusCodes";
import GenericCustomError from "./abstractCustom.error";

export default class MissingParameterError extends GenericCustomError {
  status = HTTP_STATUS_CODES.BAD_REQUEST;

  code = "MISSING_PARAMETER";
}
