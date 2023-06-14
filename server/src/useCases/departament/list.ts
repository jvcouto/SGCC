import Logger from "@utils/logger";
import InternalServerError from "@errors/server.error";
import DepartamentRepository from "@dataAccess/departament.repository";

export default class FindAllDepartaments {
  constructor(private readonly repository: DepartamentRepository) {}

  async execute(query: any) {
    try {
      return await this.repository.findAll(query);
    } catch (error: any) {
      Logger.error(error.message);
      throw new InternalServerError("Error fechting departaments");
    }
  }
}
