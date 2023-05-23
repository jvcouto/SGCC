import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import AuthenticateFailError from "src/errors/authenticateFailError";

export default function MakeAuthenticate(findOneByKey: Function) {
  return async function (email: string, password: string) {
    const user = await findOneByKey(email, "email");

    if (!user) {
      throw new AuthenticateFailError("User not found");
    }

    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign(
        { uuid: user.id, userRoles: user.roles },
        process.env.JWT_TOKEN as string,
        {
          expiresIn: process.env.JWT_EXPIRE,
        }
      );

      const resData = {
        id: user.id,
        name: user.name,
        email: user.email,
        roles: user.roles,
        token,
      };

      return { data: resData };
    }

    throw new AuthenticateFailError("Wrong username or password");
  };
}
