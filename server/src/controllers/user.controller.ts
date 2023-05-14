import { Request } from "express";
import userService from "../useCases/users";

const authenticate = async (httpRequest: Partial<Request>) => {
  const userData = await userService.authenticate(httpRequest);
  return { status: 200, data: userData };
};

export default Object.freeze({
  authenticate,
});
