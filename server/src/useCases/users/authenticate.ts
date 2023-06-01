import Logger from "@utils/logger";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import AuthenticateFailError from "@errors/authenticateFail.error";
import User from "@models/user.model";
import USER_ROLES from "@utils/constants/userRoles";

export default class AuthenticateUser {
  constructor(
    private readonly findOneByKey: Function,
    private readonly getUserPassword: Function
  ) {}

  private _getUserRoles(user: User) {
    const userRoles = [];

    if (user.administrating.length) userRoles.push(USER_ROLES.COURSE_ADMIN);
    if (user.colleges.length) userRoles.push(USER_ROLES.COLLEGE_MEMBER);
    if (user.teaching.length) userRoles.push(USER_ROLES.TEACHER);
    if (user.sysAdmin) userRoles.push(USER_ROLES.SYSTEM_ADMIN);

    return userRoles;
  }

  async authenticate(email: string, password: string, semester: number) {
    const user = (await this.findOneByKey(email, "email")) as User;

    if (!user) {
      const message = "User not found";
      Logger.info(message);
      throw new AuthenticateFailError(message);
    }

    const { password: userPassword } = await this.getUserPassword(user.id);

    const userRoles = this._getUserRoles(user);

    if (await bcrypt.compare(password, userPassword)) {
      const token = jwt.sign(
        { id: user.id, userRoles: userRoles, semester },
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
        semester,
        token,
      };

      return resData;
    }

    const message = "Wrong username or password";
    Logger.info(message);
    throw new AuthenticateFailError(message);
  }
}
