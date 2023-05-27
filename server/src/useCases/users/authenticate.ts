import Logger from "@utils/logger";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import AuthenticateFailError from "@errors/authenticateFailError";

export default class AuthenticateUser {
  constructor(private readonly findOneByKey: Function) {}

  async authenticate(email: string, password: string) {
    const user = await this.findOneByKey(email, "email");

    if (!user) {
      const message = "User not found";
      Logger.info(message);
      throw new AuthenticateFailError(message);
    }

    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign(
        { id: user.id, userRoles: user.roles },
        process.env.JWT_TOKEN as string,
        {
          expiresIn: process.env.JWT_EXPIRE,
        }
      );

      const resData = {
        id: user.id,
        name: user.name,
        email: user.email,
        token,
      };

      return { data: resData };
    }

    const message = "Wrong username or password";
    Logger.info(message);
    throw new AuthenticateFailError(message);
  }
}
