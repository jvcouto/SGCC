import Logger from "@utils/logger";
import EntityNotFound from "@errors/entityNotFound.error";
import DepartamentRepository from "@dataAccess/departament.repository";

export default class FindOneDepartament {
  constructor(private readonly repository: DepartamentRepository) {}

  async execute(id: number, query: unknown) {
    const departamentFound = await this.repository.findOne(id, query);

    if (!departamentFound) {
      const errorMessage = "Departament not found";
      Logger.info(errorMessage);
      throw new EntityNotFound(errorMessage);
    }

    return departamentFound;
  }
}
