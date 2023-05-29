import Subject from "@models/subject.model";
import { getRepository } from "typeorm";

export default async function saveSubject(subject: Subject) {
  const repository = getRepository(Subject);

  return repository.save(subject);
}
