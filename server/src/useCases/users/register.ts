import bcrypt from "bcryptjs";
import { validate } from "class-validator";
import User from "@models/user.model";

import DuplicatedEntityError from "@errors/duplicatedEntity.error";
import InvalidAttributeError from "@errors/invalidAttribute.error";
import InternalServerError from "@errors/server.error";

import Logger from "@utils/logger";
import UserRepository from "@dataAccess/user.repository";

export default class RegisterUser {
  constructor(private readonly repository: UserRepository) {}

  async execute({
    name,
    email,
    password,
  }: {
    name: string;
    email: string;
    password: string;
  }) {
    const user = await this.repository.findOne(email, "email");

    if (user) {
      Logger.error("validation failed.");
      throw new DuplicatedEntityError("Email already in use!");
    }

    const newUserData = {
      name,
      email,
      password: bcrypt.hashSync(password, 10),
    };

    const newUser = Object.assign(new User(), newUserData);

    const errors = await validate(newUser);

    if (errors.length > 0) {
      const formatedError = errors.map((error) => error.constraints);
      Logger.error(JSON.stringify(formatedError));
      throw new InvalidAttributeError("Error on user registration");
    }

    try {
      return await this.repository.save(newUser);
    } catch (error: any) {
      Logger.error(error);
      throw new InternalServerError("Error on user save");
    }
  }
}
