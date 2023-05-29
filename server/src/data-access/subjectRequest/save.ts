import SubjectRequest from "@models/subjectResquest.model";
import { getRepository } from "typeorm";

export default async function saveSubjectRequest(
  subjectRequest: SubjectRequest
) {
  const repository = getRepository(SubjectRequest);

  return repository.save(subjectRequest);
}
