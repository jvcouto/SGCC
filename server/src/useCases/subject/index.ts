import saveSubject from "@dataAccess/subject/save";
import CreateSubject from "./create";

const createSubject = new CreateSubject(saveSubject);

export { createSubject };
