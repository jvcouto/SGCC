import saveSubjectRequest from "@dataAccess/subjectRequest/save";
import CreateSubjectRequest from "./create";

const createSubjectRequest = new CreateSubjectRequest(saveSubjectRequest);

export { createSubjectRequest };
