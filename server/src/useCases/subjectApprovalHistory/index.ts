import saveSubjectApprovalHistory from "@dataAccess/subjectApprovalHistory/save";
import CreateSubjectApprovalHistory from "./create";

const createSubjectApprovalHistory = new CreateSubjectApprovalHistory(
  saveSubjectApprovalHistory
);

export { createSubjectApprovalHistory };
