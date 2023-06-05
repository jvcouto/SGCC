import Semester from "@models/semester.model";
import { getRepository } from "typeorm";

export default async function findOneSemester(id: number) {
  const repository = getRepository(Semester);

  return repository.findOne(id);
}
