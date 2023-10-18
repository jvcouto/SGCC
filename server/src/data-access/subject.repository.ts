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

  async findOne(id: number) {
    const repository = getRepository(Subject);

    return repository.findOne(id, { relations: ["departament"] });
  }

  async findSubjectsByCourse(
    courseId: number,
    addRequired: boolean,
    addOptional: boolean
  ) {
    const repository = getRepository(Subject);

    return repository.find({
      where: {
        course: {
          id: courseId,
        },
        ...(addRequired && addOptional ? {} : { optionalSubject: addOptional }),
      },
    });
  }
}
