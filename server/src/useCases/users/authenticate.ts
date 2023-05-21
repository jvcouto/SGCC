import { User } from "@models/index";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import AuthenticateFailError from "src/errors/authenticateFailError";

type ifindOneByKey = (key: string, value: string) => Promise<User | undefined>;

export default class MakeAuthenticate {
  constructor(private findOneByKey: ifindOneByKey) {
    this.findOneByKey = findOneByKey;
  }

  public async authenticate(email: string, password: string) {
    const user = await this.findOneByKey("email", email);

    if (!user) {
      throw new AuthenticateFailError("User not found");
    }

    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign(
        { uuid: user.id, userRoles: user.userRoles },
        process.env.JWT_TOKEN as string,
        {
          expiresIn: process.env.JWT_EXPIRE,
        }
      );

      const resData = {
        id: user.id,
        name: user.name,
        email: user.email,
        roles: user.userRoles,
        token,
      };

      return { data: resData };
    }

    throw new AuthenticateFailError("Wrong username or password");
  }
}
