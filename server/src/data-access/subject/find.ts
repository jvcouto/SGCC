import Subject from "@models/subject.model";
import { getRepository } from "typeorm";

export default async function findSubjects(params: any) {
  const repository = getRepository(Subject);

  return repository.findAndCount({
    skip: params.page,
    take: params.page_size,
  });
}
