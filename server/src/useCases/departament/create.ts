import { validate } from "class-validator";
import Logger from "@utils/logger";
import InvalidAttributeError from "@errors/invalidAttribute.error";
import InternalServerError from "@errors/server.error";
import DepartamentRepository from "@dataAccess/departament.repository";
import Departament from "@models/departament";

export default class CreateDepartament {
  constructor(private readonly repository: DepartamentRepository) {}

  async execute(departamentData: any) {
    if (departamentData.admins && departamentData.admins.length) {
      departamentData.admins.forEach((admin: any) => {
        admin.createdAt = new Date();
      });
    }

    const newDepartament = Object.assign(
      new Departament(),
      departamentData
    ) as Departament;

    const errors = await validate(newDepartament);

    if (errors.length > 0) {
      const formatedError = errors.map((error) => error.constraints);
      Logger.error(JSON.stringify(formatedError));
      throw new InvalidAttributeError("Error on departament creation");
    }

    try {
      return await this.repository.save(newDepartament);
    } catch (error: any) {
      Logger.error(error.message);
      throw new InternalServerError("Error on departament creation");
    }
  }
}
