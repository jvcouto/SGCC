import { getRepository } from "typeorm";
import SubjectOffer from "@models/subjectOffer.model";

export default class SubjectOfferRepository {
  async save(subjectOffer: SubjectOffer) {
    const repository = getRepository(SubjectOffer);

    return repository.save(subjectOffer);
  }
}
