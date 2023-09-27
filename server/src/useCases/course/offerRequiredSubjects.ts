import Logger from "@utils/logger";
import CourseRepository from "@dataAccess/course.repository";
import SubjectRepository from "@dataAccess/subject.repository";
import SubjectOfferRepository from "@dataAccess/subjectOffer.repository";
import SubjectOffer from "@models/subjectOffer.model";
import { validate } from "class-validator";
import InvalidAttributeError from "@errors/invalidAttribute.error";
import EntityNotFound from "@errors/entityNotFound.error";
import InternalServerError from "@errors/server.error";
import DuplicatedEntityError from "@errors/duplicatedEntity.error";

export default class OfferAllRequiredSubjects {
  constructor(
    private readonly repository: CourseRepository,
    private readonly subjectRepository: SubjectRepository,
    private readonly subjectOfferRepository: SubjectOfferRepository
  ) {}

  async execute(courseId: number, data: unknown) {
    const requiredSubjects =
      await this.subjectRepository.findRequiredSubjectsByCourse(courseId);

    if (!requiredSubjects.length) {
      const errorMessage = "Course dont have required subjects";
      Logger.error(errorMessage);
      throw new EntityNotFound(errorMessage);
    }

    const { periodId } = data as { periodId: number };

    const requiredSubjectOffersData = requiredSubjects.map((eachSubject) => {
      return Object.assign(new SubjectOffer(), {
        period: {
          id: periodId,
        },
        subject: {
          id: eachSubject.id,
        },
      });
    });

    const errors = await validate(requiredSubjectOffersData);

    if (errors.length > 0) {
      const formatedError = errors.map((error) => error.constraints);
      Logger.error(JSON.stringify(formatedError));
      throw new InvalidAttributeError("Error offering required subjects");
    }

    try {
      const subjectOffers = await this.subjectOfferRepository.bulkCreate(
        requiredSubjectOffersData
      );

      return await this.subjectOfferRepository.findByIds(
        subjectOffers.map((eachSubjectOffer) => eachSubjectOffer.id)
      );
    } catch (error: any) {
      if (error.routine === "_bt_check_unique") {
        Logger.error(error.message);
        throw new DuplicatedEntityError("Duplicated subject offer");
      }
      throw new InternalServerError("Error Offering required subjects");
    }
  }
}
