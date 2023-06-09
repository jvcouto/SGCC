import SubjectApprovalHistoryRepository from "@dataAccess/subjectApprovalHistory.repository";
import CreateSubjectApprovalHistory from "./create";

const subjectApprovalHistoryRepository = new SubjectApprovalHistoryRepository();

const createSubjectApprovalHistory = new CreateSubjectApprovalHistory(
  subjectApprovalHistoryRepository
);

export { createSubjectApprovalHistory };
