import saveSemester from "@dataAccess/semester/save";
import findSemesters from "@dataAccess/semester/find";

import CreateSemester from "./create";
import ListSemesters from "./list";

const createSemester = new CreateSemester(saveSemester);
const listSemesters = new ListSemesters(findSemesters);

export { createSemester, listSemesters };
