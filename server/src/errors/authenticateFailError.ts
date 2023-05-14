import HTTP_STATUS_CODES from "@utils/constants/httpStatusCodes";
import GenericCustomError from "./abstractCustomError";

export default class AuthenticateFailError extends GenericCustomError {
  status = HTTP_STATUS_CODES.UNAUTHORIZED;

  code = "WRONG_CREDENCIALS";
}
