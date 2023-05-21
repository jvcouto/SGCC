import { Request } from "express";
import userService from "../useCases/users";

const authenticate = async (httpRequest: Partial<Request>) => {
  const { email, password }: { email: string; password: string } =
    httpRequest.body;
  const userData = await userService.authenticate(email, password);
  return { status: 200, data: userData };
};

export default Object.freeze({
  authenticate,
});
