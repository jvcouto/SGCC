import HTTP_STATUS_CODES from "@utils/constants/httpStatusCodes";
import GenericCustomError from "./abstractCustom.error";

export default class AuthenticateFailError extends GenericCustomError {
  code = "WRONG_CREDENCIALS";

  constructor(message: string, code?: string) {
    super(message);
    if (code) {
      this.code = code;
    }
  }

  status = HTTP_STATUS_CODES.UNAUTHORIZED;
}
