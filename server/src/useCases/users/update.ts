import User from "@models/user.model";
import bcrypt from "bcryptjs";
import { validate } from "class-validator";
import Logger from "@utils/logger";

import EntityNotFound from "@errors/entityNotFound.error";
import InvalidAttributeError from "@errors/invalidAttribute.error";
import InternalServerError from "@errors/server.error";

export default class UpdateUser {
  constructor(
    private readonly findOneByKey: Function,
    private readonly getUserPassword: Function,
    private readonly saveUser: (user: User) => Promise<User>
  ) {}

  async update(id: string | undefined, userData: any) {
    const user = await this.findOneByKey(id);

    if (!user) {
      const errorMessage = "User not found!";
      Logger.error(errorMessage);
      throw new EntityNotFound(errorMessage);
    }

    if (userData.password) {
      const { password: userPassword } = await this.getUserPassword(user.id);
      if (!(await bcrypt.compare(userData.password, userPassword))) {
        throw new InvalidAttributeError("Invalid Password");
      }
      delete userData.password;
    }

    if (userData.newPassword) {
      userData.password = bcrypt.hashSync(userData.newPassword, 10);
      delete userData.newPasswordRepeat;
      delete userData.newPassword;
    }

    const updatedFields = Object.assign(new User(), {
      id,
      ...userData,
    }) as User;

    const errors = await validate(updatedFields, {
      skipUndefinedProperties: true,
    });

    if (errors.length > 0) {
      const formatedError = errors.map((error) => error.constraints);
      Logger.error(JSON.stringify(formatedError));
      throw new InvalidAttributeError("Error updating the user");
    }

    try {
      return await this.saveUser(updatedFields);
    } catch (error: any) {
      Logger.error(error.message);
      throw new InternalServerError("Error updating the user");
    }
  }
}
