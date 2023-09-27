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

    return repository.findByIds(ids, { relations: ["period", "subject"] });
  }
}
