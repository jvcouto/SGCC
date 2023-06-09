import { Request } from "express";
import {
  registerUser,
  authenticateUser,
  updateUser,
  getAuthenticatedUserInfo,
} from "../useCases/users";
import HTTP_STATUS_CODES from "@utils/constants/httpStatusCodes";
import Logger from "@utils/logger";
import NotAuthenticatedError from "@errors/notAuthenticated.error";

export default function MakeUserController() {
  const authenticate = async (httpRequest: Partial<Request>) => {
    const {
      email,
      password,
      semester,
    }: { email: string; password: string; semester: number } = httpRequest.body;

    const userData = await authenticateUser.execute(email, password, semester);

    return { status: HTTP_STATUS_CODES.OK, data: userData };
  };

  const register = async (httpRequest: Partial<Request>) => {
    const userData = await registerUser.execute(httpRequest.body);

    return { status: HTTP_STATUS_CODES.CREATED, data: userData };
  };

  const update = async (httpRequest: Partial<Request>) => {
    const userData = await updateUser.execute(
      httpRequest.params?.id,
      httpRequest.body
    );

    return { status: HTTP_STATUS_CODES.OK, data: userData };
  };

  const getCurrentUser = async (httpRequest: Partial<Request>) => {
    if (!httpRequest.headers?.authorization) {
      const message = "Token not provided";
      Logger.error(message);
      throw new NotAuthenticatedError("Token not found");
    }

    const token = httpRequest.headers?.authorization
      ?.replace("Bearer", "")
      .trim();

    const userData = await getAuthenticatedUserInfo.execute(token);

    return { status: HTTP_STATUS_CODES.OK, data: userData };
  };

  return Object.freeze({
    authenticate,
    register,
    update,
    getCurrentUser,
  });
}
