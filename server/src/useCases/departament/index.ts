import DepartamentRepository from "@dataAccess/departament.repository";
import FindAllDepartaments from "./list";
import CreateDepartament from "./create";
import FindOneDepartament from "./findOne";

const departamentRepository = new DepartamentRepository();

const listDepartaments = new FindAllDepartaments(departamentRepository);
const createDepartament = new CreateDepartament(departamentRepository);
const findOneDepartament = new FindOneDepartament(departamentRepository);

export { listDepartaments, createDepartament, findOneDepartament };
