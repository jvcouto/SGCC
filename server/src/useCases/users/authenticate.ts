import { User } from "@models/index";
import { Request } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import AuthenticateFailError from "src/errors/authenticateFailError";

interface iMakeAuthenticate {
  findOneByKey: (param: {
    key: string;
    value: string;
  }) => Promise<User | undefined>;
}

export default function makeAuthenticate({ findOneByKey }: iMakeAuthenticate) {
  return async function authenticate({ body }: Partial<Request>) {
    const { email, password } = body;

    const user = await findOneByKey({
      key: "email",
      value: email,
    });

    if (!user) {
      throw new AuthenticateFailError("User not found");
    }

    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign(
        { uuid: user.id },
        process.env.JWT_TOKEN as string,
        {
          expiresIn: process.env.JWT_EXPIRE,
        }
      );

      const data = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.userRoles,
        token,
      };

      return { data };
    }

    throw new AuthenticateFailError("Wrong username or password");
  };
}
