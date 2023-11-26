import { getRepository } from "typeorm";
import SubjectOffer from "@models/subjectOffer.model";

export default class SubjectOfferRepository {
  async save(subjectOffer: SubjectOffer) {
    const repository = getRepository(SubjectOffer);

    return repository.save(subjectOffer);
  }

  async bulkCreate(subjectOffer: SubjectOffer[]) {
    const repository = getRepository(SubjectOffer);

    return repository.save(subjectOffer);
  }

  async findByIds(ids: number[]) {
    const repository = getRepository(SubjectOffer);

    return repository.findByIds(ids, {
      relations: ["period", "subject", "teachers", "subject.course"],
    });
  }

  async findExistentBulkSubject(
    courseId: number,
    perdiodId: number,
    addRequired: boolean,
    addOptional: boolean
  ) {
    const repository = getRepository(SubjectOffer);

    return repository.find({
      where: {
        course: {
          id: courseId,
        },
        period: {
          id: perdiodId,
        },
        class: "unique",
        ...(addRequired && addOptional ? {} : { optionalSubject: addOptional }),
      },
      relations: ["subject"],
    });
  }

  async update(subjectOffer: SubjectOffer) {
    const repository = getRepository(SubjectOffer);

    return repository.save(subjectOffer);
  }
}
