import HTTP_STATUS_CODES from "@utils/constants/httpStatusCodes";
import GenericCustomError from "./abstractCustomError";

export default class RegisterError extends GenericCustomError {
  status = HTTP_STATUS_CODES.BAD_REQUEST;

  code = "REGISTER_ERROR";
}
