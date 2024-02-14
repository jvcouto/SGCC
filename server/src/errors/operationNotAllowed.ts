import HTTP_STATUS_CODES from "@utils/constants/httpStatusCodes";
import GenericCustomError from "./abstractCustom.error";

export default class OperationNotAllowed extends GenericCustomError {
  status = HTTP_STATUS_CODES.BAD_REQUEST;

  code = "NOT_ALLOWED";
}
