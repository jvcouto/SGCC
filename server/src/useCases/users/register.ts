import bcrypt from "bcryptjs";
import { validate } from "class-validator";
import Logger from "@utils/logger";
import RegisterError from "@errors/registerError";
import User from "@models/user.model";

export default class RegisterUseCase {
  constructor(
    private readonly findOneByKey: any,
    private readonly saveUser: any
  ) {}

  async register({
    name,
    email,
    password,
  }: {
    name: string;
    email: string;
    password: string;
  }) {
    const user = await this.findOneByKey(email, "email");

    if (user) {
      Logger.error("validation failed.");
      throw new RegisterError("Email already in use!");
    }

    const newUserData = {
      name,
      email,
      password: bcrypt.hashSync(password, 10),
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
