import Semester from "@models/semester.model";
import { getRepository } from "typeorm";

export default async function saveSemester(semester: Semester) {
  const repository = getRepository(Semester);

  return repository.save(semester);
}
