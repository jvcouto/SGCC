import Logger from "@utils/logger";
import EntityNotFound from "@errors/entityNotFound.error";
import DepartamentRepository from "@dataAccess/departament.repository";

export default class FindOneDepartament {
  constructor(private readonly repository: DepartamentRepository) {}

  async execute(id: number) {
    const departamentFound = await this.repository.findOne(id);

    if (!departamentFound) {
      const errorMessage = "Departament not found";
      throw new EntityNotFound(errorMessage);
    }

    return departamentFound;
  }
}
