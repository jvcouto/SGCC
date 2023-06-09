import { getRepository } from "typeorm";

import SubjectApprovalHistory from "@models/subjectApprovalHistory.model";

export default class SubjectApprovalHistoryRepository {
  async save(subjectApprovalHistory: SubjectApprovalHistory) {
    const repository = getRepository(SubjectApprovalHistory);

    return repository.save(subjectApprovalHistory);
  }
}
