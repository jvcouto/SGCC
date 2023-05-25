import User from "@models/user.model";
import bcrypt from "bcryptjs";
import { validate } from "class-validator";
import Logger from "@utils/logger";
import RegisterError from "src/errors/registerError";

export default class UpdateUseCase {
  constructor(
    private readonly findOneByKey: Function,
    private readonly saveUser: Function
  ) {}

  async update(id: string | undefined, userData: any) {
    const user = await this.findOneByKey(id);

    if (!user) {
      const errorMessage = "User not found!";
      Logger.error(errorMessage);
      throw new RegisterError(errorMessage);
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
      Logger.error("Update validation data failed");
      const formatedError = errors.map((error) => error.constraints);
      Logger.error(JSON.stringify(formatedError));
      throw new RegisterError("Error updating the user");
    }

    try {
      return this.saveUser(updatedUser);
    } catch (error: any) {
      Logger.error(error.message);
      throw new RegisterError("Some error occurred updating the engineer!");
    }
  }
}
