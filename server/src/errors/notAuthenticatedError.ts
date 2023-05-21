import HTTP_STATUS_CODES from "@utils/constants/httpStatusCodes";
import GenericCustomError from "./abstractCustomError";

export default class NotAuthenticatedError extends GenericCustomError {
  status = HTTP_STATUS_CODES.UNAUTHORIZED;

  code = "NOT_AUTHENTICATED";
}
