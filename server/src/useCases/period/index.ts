import CreateSemester from "./create";
import ListSemesters from "./list";
import FindSemester from "./findOne";
import PeriodRepository from "@dataAccess/period.repository";

const periodRepository = new PeriodRepository();

const createPeriod = new CreateSemester(periodRepository);
const listPeriods = new ListSemesters(periodRepository);
const findPeriod = new FindSemester(periodRepository);

export { createPeriod, listPeriods, findPeriod };
