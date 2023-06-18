import { getRepository } from "typeorm";
import Subject from "@models/subject.model";

export default class SubjectRepository {
  async find(query: any) {
    const repository = getRepository(Subject);

    return repository.findAndCount({
      skip: query.page,
      take: query.page_size,
    });
  }

  async save(subject: Subject) {
    const repository = getRepository(Subject);

    return repository.save(subject);
  }
}
