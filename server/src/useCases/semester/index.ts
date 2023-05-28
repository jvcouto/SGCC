import saveSemester from "@dataAccess/semester/save";
import CreateSemester from "./create";

const createSemester = new CreateSemester(saveSemester);

export { createSemester };
