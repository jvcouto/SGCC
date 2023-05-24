import { Request } from "express";
import {
  registerUseCase,
  authenticateUserCase,
  updateUserCase,
} from "../useCases/users";
import HTTP_STATUS_CODES from "@utils/constants/httpStatusCodes";

export default function MakeUserController() {
  const authenticate = async (httpRequest: Partial<Request>) => {
    const { email, password }: { email: string; password: string } =
      httpRequest.body;

    const userData = await authenticateUserCase.authenticate(email, password);

    return { status: HTTP_STATUS_CODES.OK, data: userData };
  };

  const register = async (httpRequest: Partial<Request>) => {
    const userData = await registerUseCase.register(httpRequest.body);

    return { status: HTTP_STATUS_CODES.CREATED, data: userData };
  };

  const update = async (httpRequest: Partial<Request>) => {
    const userData = await updateUserCase.update(httpRequest.body);

    return { status: HTTP_STATUS_CODES.CREATED, data: userData };
  };

  const logout = async (httpRequest: Partial<Request>) => {
    return { status: HTTP_STATUS_CODES.CREATED, data: [] };
  };

  return Object.freeze({
    authenticate,
    register,
    update,
    logout,
  });
}
