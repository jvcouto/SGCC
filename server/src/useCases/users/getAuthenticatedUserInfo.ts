import Logger from "@utils/logger";
import jwt from "jsonwebtoken";

import User from "@models/user.model";
import InternalServerError from "@errors/server.error";

export default class GetAuthenticatedUserInfo {
  constructor(private readonly findOneByKey: Function) {}

  async getUserInfo(token: string) {
    try {
      const data = jwt.verify(token, process.env.JWT_TOKEN as string) as any;
      const { id, userRoles, semester } = data;

      const user = (await this.findOneByKey(id)) as User;

      return { ...user, roles: userRoles, semester };
    } catch (error) {
      Logger.error(error as string);
      throw new InternalServerError("Error fecthing current user");
    }
  }
}
