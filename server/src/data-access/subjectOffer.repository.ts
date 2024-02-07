import { In, getRepository } from "typeorm";
import SubjectOffer from "@models/subjectOffer.model";
import { UserRoles } from "@utils/constants/userRoles";
import { IUser } from "src/interfaces/user.interface";
import {
  DEFAULT_PAGE_SIZE,
  MAX_TAKE_ITEMS,
} from "@utils/constants/paginationOptions";

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

  async findOne(id: number) {
    const repository = getRepository(SubjectOffer);

    return repository.findOne(id);
  }

  async closeSubjectsByPeriod(
    subjectsIds: number[],
    periodId: number,
    close: boolean
  ) {
    const repository = getRepository(SubjectOffer);

    const query = repository
      .createQueryBuilder()
      .update()
      .set({ closed: close })
      .where({
        id: In(subjectsIds),
        periodOId: periodId,
      });

    return query.execute();
  }

  async getSubjectOfferTeachers(id: number) {
    const repository = getRepository(SubjectOffer);

    return repository.findOne(id, {
      relations: ["teachers"],
    });
  }

  async find({ query, user }: { query: any; user: IUser }) {
    const repository = getRepository(SubjectOffer);

    const queryBuilder = repository
      .createQueryBuilder("subjectOffer")
      .leftJoinAndSelect("subjectOffer.teachers", "teachers")
      .leftJoinAndSelect("subjectOffer.subject", "subject");

    if (query.period) {
      queryBuilder.andWhere("subjectOffer.period = :periodId", {
        periodId: query.period,
      });
    }

    if (user.userRoles.includes(UserRoles.TEACHER)) {
      queryBuilder.andWhere("teachers.id = :alias", { alias: user.id });
    }

    if (query.page) {
      queryBuilder.skip(query.page * DEFAULT_PAGE_SIZE);
      queryBuilder.take(DEFAULT_PAGE_SIZE);
    } else {
      queryBuilder.take(MAX_TAKE_ITEMS);
    }

    return queryBuilder.getManyAndCount();
  }
}
