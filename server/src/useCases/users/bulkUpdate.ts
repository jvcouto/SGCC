import User from "@models/user.model";
import { validate } from "class-validator";
import Logger from "@utils/logger";

import InvalidAttributeError from "@errors/invalidAttribute.error";
import InternalServerError from "@errors/server.error";
import UserRepository from "@dataAccess/user.repository";

export default class BulkUpdateUser {
  constructor(private readonly repository: UserRepository) {}

  async execute(ids: string[], updatedValues: any) {
    const updatedUsersData = ids.map((id) => {
      return Object.assign(new User(), {
        id,
        ...updatedValues,
      }) as User;
    });

    updatedUsersData.forEach(async (eachUserUpdated) => {
      const errors = await validate(eachUserUpdated, {
        skipUndefinedProperties: true,
      });

      if (errors.length > 0) {
        const formatedError = errors.map((error) => error.constraints);
        Logger.error(JSON.stringify(formatedError));
        throw new InvalidAttributeError("Error updating the user");
      }
    });

    try {
      return await this.repository.bulkUpdate(updatedUsersData);
    } catch (error: any) {
      Logger.error(error.message);
      throw new InternalServerError("Error bulk updating users");
    }
  }
}
