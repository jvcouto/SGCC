import User from "@models/user.model";
import bcrypt from "bcryptjs";
import { validate } from "class-validator";
import Logger from "@utils/logger";
import RegisterError from "src/errors/registerError";
import USER_ROLES from "@utils/constants/userRoles";

export default class UpdateUseCase {
  constructor(
    private readonly findOneByKey: Function,
    private readonly saveUser: Function
  ) {}

  async update({
    id,
    name,
    email,
    password,
  }: {
    id: string;
    name: string;
    email: string;
    password: string;
  }) {
    const user = await this.findOneByKey(id);

    if (!user) {
      const errorMessage = "User not found!";
      Logger.error(errorMessage);
      throw new RegisterError(errorMessage);
    }

    const newUserData = {
      name,
      email,
      password: bcrypt.hashSync(password, 10),
      roles: [
        {
          id: USER_ROLES.COURSE_ADMIN,
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
      return this.saveUser(newUser);
    } catch (error: any) {
      Logger.error(error.message);
      throw new RegisterError("Something went wrong in register!");
    }
  }
}
