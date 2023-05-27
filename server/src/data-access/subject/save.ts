import Subject from "@models/subject.model";
import { getRepository } from "typeorm";

export default async function saveSubject(subject: Subject) {
  const userRepository = getRepository(Subject);

  return userRepository.save(subject);
}
