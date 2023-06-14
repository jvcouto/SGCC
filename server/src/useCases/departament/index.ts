import DepartamentRepository from "@dataAccess/departament.repository";
import FindAllDepartaments from "./list";
import CreateDepartament from "./create";

const departamentRepository = new DepartamentRepository();

const listDepartaments = new FindAllDepartaments(departamentRepository);
const createDepartament = new CreateDepartament(departamentRepository);

export { listDepartaments, createDepartament };
