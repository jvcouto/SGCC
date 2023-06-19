import Logger from "@utils/logger";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import AuthenticateFailError from "@errors/authenticateFail.error";
import User from "@models/user.model";
import USER_ROLES from "@utils/constants/userRoles";
import UserRepository from "@dataAccess/user.repository";

export default class AuthenticateUser {
  constructor(private readonly repository: UserRepository) {}

  private _getUserRoles(user: User) {
    const userRoles = [];

    if (user.administrating.length) userRoles.push(USER_ROLES.COURSE_ADMIN);
    if (user.colleges.length) userRoles.push(USER_ROLES.COLLEGE_MEMBER);
    if (user.departament) userRoles.push(USER_ROLES.TEACHER);
    if (user.sysAdmin) userRoles.push(USER_ROLES.SYSTEM_ADMIN);

    return userRoles;
  }

  async execute(email: string, password: string) {
    const user = (await this.repository.findOne(email, "email")) as User;

    if (!user) {
      const message = "User not found";
      Logger.info(message);
      throw new AuthenticateFailError(message);
    }

    const { password: userPassword } = (await this.repository.getUserPassword(
      user.id
    )) as User;

    const userRoles = this._getUserRoles(user);

    if (await bcrypt.compare(password, userPassword)) {
      const token = jwt.sign(
        { id: user.id, userRoles: userRoles },
        process.env.JWT_TOKEN as string,
        {
          expiresIn: process.env.JWT_EXPIRE,
        }
      );

      const resData = {
        id: user.id,
        name: user.name,
        email: user.email,
        roles: userRoles,
        token,
      };

      return resData;
    }

    const message = "Wrong username or password";
    Logger.info(message);
    throw new AuthenticateFailError(message);
  }
}
