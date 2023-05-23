import { User } from "@models/index";
import bcrypt from "bcryptjs";
import { validate } from "class-validator";
import Logger from "@utils/logger";
import RegisterError from "src/errors/registerError";
import USER_ROLES from "@utils/constants/userRoles";

export default function MakeRegister(
  findOneByKey: Function,
  saveUser: Function
) {
  return async function register({
    name,
    email,
    password,
  }: {
    name: string;
    email: string;
    password: string;
  }) {
    const user = await findOneByKey(email, "email");

    if (user) {
      Logger.error("validation failed.");
      throw new RegisterError("Email already in use!");
    }

    const newUserData = {
      name,
      email,
      password: bcrypt.hashSync(password, 10),
      roles: [
        {
          id: USER_ROLES.ADMIN,
        },
      ],
    };

    const newUser = Object.assign(new User(), newUserData);

    const errors = await validate(newUser);

    if (errors.length > 0) {
      Logger.error("validation failed.");
      const formatedError = errors.map((error) => error.constraints);
      Logger.error(JSON.stringify(formatedError));
      throw new RegisterError("Something went wrong during registration");
    }

    try {
      return saveUser(newUser);
    } catch (error: any) {
      Logger.error(error.message);
      throw new RegisterError("Something went wrong in register!");
    }
  };
}
