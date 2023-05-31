import SubjectApprovalHistory from "@models/subjectApprovalHistory.model";
import { getRepository } from "typeorm";

export default async function saveSubjectApprovalHistory(
  subjectApprovalHistory: SubjectApprovalHistory
) {
  const repository = getRepository(SubjectApprovalHistory);

  return repository.save(subjectApprovalHistory);
}
