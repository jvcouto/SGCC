import Semester from "@models/semester.model";
import { getRepository } from "typeorm";

export default async function saveSemester(semester: Semester) {
  const userRepository = getRepository(Semester);

  return userRepository.save(semester);
}
