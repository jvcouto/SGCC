import SubjectOffer from "@models/subjectOffer.model";
import { getRepository } from "typeorm";

export default async function saveSubjectOffer(subjectOffer: SubjectOffer) {
  const repository = getRepository(SubjectOffer);

  return repository.save(subjectOffer);
}
