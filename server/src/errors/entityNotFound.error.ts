import HTTP_STATUS_CODES from "@utils/constants/httpStatusCodes";
import GenericCustomError from "./abstractCustom.error";

export default class EntityNotFound extends GenericCustomError {
  status = HTTP_STATUS_CODES.NOT_FOUND;

  code = "ENTITY_NOT_FOUND";
}
