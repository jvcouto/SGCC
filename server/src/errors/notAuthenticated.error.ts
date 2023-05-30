import HTTP_STATUS_CODES from "@utils/constants/httpStatusCodes";
import GenericCustomError from "./abstractCustom.error";

export default class NotAuthenticatedError extends GenericCustomError {
  status = HTTP_STATUS_CODES.UNAUTHORIZED;

  code = "NOT_AUTHENTICATED";
}
