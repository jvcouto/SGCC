import { Request } from "express";
import userService from "../useCases/users";
import HTTP_STATUS_CODES from "@utils/constants/httpStatusCodes";

const authenticate = async (httpRequest: Partial<Request>) => {
  const { email, password }: { email: string; password: string } =
    httpRequest.body;

  const userData = await userService.authenticate(email, password);

  return { status: HTTP_STATUS_CODES.OK, data: userData };
};

const register = async (httpRequest: Partial<Request>) => {
  const {
    name,
    email,
    password,
  }: { name: string; email: string; password: string } = httpRequest.body;

  const userData = await userService.register({ name, email, password });

  return { status: HTTP_STATUS_CODES.CREATED, data: userData };
};

export default Object.freeze({
  authenticate,
  register,
});
