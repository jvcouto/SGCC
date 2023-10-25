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
    const { periodId, addRequired, addOptional } = data as {
      periodId: number;
      addRequired: boolean;
      addOptional: boolean;
    };

    const courseSubjects = await this.subjectRepository.findSubjectsByCourse(
      courseId,
      addRequired,
      addOptional
    );

    if (!courseSubjects.length) {
      const errorMessage = "Course dont have subjects to add";
      Logger.error(errorMessage);
      throw new EntityNotFound(errorMessage);
    }

    const alreadyExistingSubjects =
      await this.subjectOfferRepository.findExistentBulkSubject(
        courseId,
        periodId,
        addRequired,
        addOptional
      );

    const alreadyExistingSubjectsIDs = alreadyExistingSubjects.map(
      (e) => e.subject.id
    );

    const nonExistentSubject = courseSubjects.filter(
      (e) => !alreadyExistingSubjectsIDs.includes(e.id)
    );

    const requiredSubjectOffersData = nonExistentSubject.map((eachSubject) => {
      return Object.assign(new SubjectOffer(), {
        period: {
          id: periodId,
        },
        subject: {
          id: eachSubject.id,
        },
        places: eachSubject.places,
      });
    });

    const errors = await validate(requiredSubjectOffersData);

    if (errors.length > 0) {
      const formatedError = errors.map((error) => error.constraints);
      Logger.error(JSON.stringify(formatedError));
      throw new InvalidAttributeError("Error offering subjects");
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
      Logger.error(error.message);
      throw new InternalServerError("Error Offering subjects");
    }
  }
}
