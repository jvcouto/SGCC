import Semester from "@models/semester.model";
import { getRepository } from "typeorm";

export default async function findSemesters() {
  const repository = getRepository(Semester);

  return repository.find();
}
