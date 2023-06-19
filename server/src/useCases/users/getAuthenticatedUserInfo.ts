import Logger from "@utils/logger";
import jwt from "jsonwebtoken";

import User from "@models/user.model";
import InternalServerError from "@errors/server.error";
import UserRepository from "@dataAccess/user.repository";

export default class GetAuthenticatedUserInfo {
  constructor(private readonly repository: UserRepository) {}

  async execute(token: string) {
    try {
      const data = jwt.verify(token, process.env.JWT_TOKEN as string) as any;
      const { id, userRoles } = data;

      const user = (await this.repository.findOne(id)) as User;

      return { ...user, roles: userRoles };
    } catch (error) {
      Logger.error(error as string);
      throw new InternalServerError("Error fecthing current user");
    }
  }
}
