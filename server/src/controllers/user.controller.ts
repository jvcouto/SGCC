import { Request } from "express";
import { registerUser, authenticateUser, updateUser } from "../useCases/users";
import HTTP_STATUS_CODES from "@utils/constants/httpStatusCodes";

export default function MakeUserController() {
  const authenticate = async (httpRequest: Partial<Request>) => {
    const { email, password }: { email: string; password: string } =
      httpRequest.body;

    const userData = await authenticateUser.authenticate(email, password);

    return { status: HTTP_STATUS_CODES.OK, data: userData };
  };

  const register = async (httpRequest: Partial<Request>) => {
    const userData = await registerUser.register(httpRequest.body);

    return { status: HTTP_STATUS_CODES.CREATED, data: userData };
  };

  const update = async (httpRequest: Partial<Request>) => {
    const userData = await updateUser.update(
      httpRequest.params?.id,
      httpRequest.body
    );

    return { status: HTTP_STATUS_CODES.OK, data: userData };
  };

  return Object.freeze({
    authenticate,
    register,
    update,
  });
}
