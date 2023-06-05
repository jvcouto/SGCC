import saveSemester from "@dataAccess/semester/save";
import findSemesters from "@dataAccess/semester/find";

import CreateSemester from "./create";
import ListSemesters from "./list";
import FindSemester from "./findOne";
import findOneSemester from "@dataAccess/semester/findOne";

const createSemester = new CreateSemester(saveSemester);
const listSemesters = new ListSemesters(findSemesters);
const findSemester = new FindSemester(findOneSemester);

export { createSemester, listSemesters, findSemester };
