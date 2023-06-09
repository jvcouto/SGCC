import { getRepository } from "typeorm";
import Subject from "@models/subject.model";

export default class SubjectRepository {
  async find(params: any) {
    const repository = getRepository(Subject);

    return repository.findAndCount({
      skip: params.page,
      take: params.page_size,
    });
  }

  async save(subject: Subject) {
    const repository = getRepository(Subject);

    return repository.save(subject);
  }
}
