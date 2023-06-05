import saveSubject from "@dataAccess/subject/save";
import CreateSubject from "./create";
import ListSubjects from "./list";
import findSubjects from "@dataAccess/subject/find";

const createSubject = new CreateSubject(saveSubject);

const listSubjects = new ListSubjects(findSubjects);

export { createSubject, listSubjects };
