import User from "@models/user.model";
import bcrypt from "bcryptjs";
import { validate } from "class-validator";
import Logger from "@utils/logger";

import EntityNotFound from "@errors/entityNotFoundError";
import InvalidAttributeError from "@errors/invalidAttributeError";
import InternalServerError from "@errors/serverError";

export default class UpdateUser {
  constructor(
    private readonly findOneByKey: Function,
    private readonly saveUser: Function
  ) {}

  async update(id: string | undefined, userData: any) {
    const user = await this.findOneByKey(id);

    if (!user) {
      const errorMessage = "User not found!";
      Logger.error(errorMessage);
      throw new EntityNotFound(errorMessage);
    }

    if (user.newPassword) {
      if (!(await bcrypt.compare(userData.password, user.password))) {
        //erro validando as senhas antigas
      }
      userData.password = bcrypt.hashSync(userData.newPassword, 10);

      delete userData.newPasswordRepeat;
      delete userData.newPassword;
    }

    const updatedUser = Object.assign(new User(), {
      ...user,
      ...userData,
    });

    const errors = await validate(updatedUser);

    if (errors.length > 0) {
      const formatedError = errors.map((error) => error.constraints);
      Logger.error(JSON.stringify(formatedError));
      throw new InvalidAttributeError("Error updating the user");
    }

    try {
      return this.saveUser(updatedUser);
    } catch (error: any) {
      Logger.error(error.message);
      throw new InternalServerError("Some error occurred updating the user!");
    }
  }
}
