import { validate } from "class-validator";
import Logger from "@utils/logger";
import InvalidAttributeError from "@errors/invalidAttribute.error";
import InternalServerError from "@errors/server.error";
import SubjectOffer from "@models/subjectOffer.model";
import SubjectOfferRepository from "@dataAccess/subjectOffer.repository";
import DuplicatedEntityError from "@errors/duplicatedEntity.error";
import { IUser } from "src/interfaces/user.interface";
import EntityNotFound from "@errors/entityNotFound.error";

export default class RequestSubjectOffer {
  constructor(private readonly repository: SubjectOfferRepository) {}

  async execute(params: any, user?: IUser) {
    const { offerUid }: { offerUid: number } = params;

    const [subjectOfferFound] = await this.repository.findByIds([
      Number(offerUid),
    ]);

    if (!subjectOfferFound) {
      const errorMessage = "Offer not found!";
      Logger.error(errorMessage);
      throw new EntityNotFound(errorMessage);
    }

    const subjectOfferRequest = Object.assign(new SubjectOffer(), {
      id: Number(offerUid),
      teachers: [
        {
          id: user?.id,
        },
      ],
    }) as SubjectOffer;

    if (subjectOfferRequest?.teachers?.length) {
      subjectOfferRequest.teachers = [
        ...subjectOfferFound.teachers,
        ...subjectOfferRequest.teachers,
      ];
    }

    const errors = await validate(subjectOfferRequest, {
      skipUndefinedProperties: true,
    });

    if (errors.length > 0) {
      const formatedError = errors.map((error) => error.constraints);
      Logger.error(JSON.stringify(formatedError));
      throw new InvalidAttributeError("Error requesting subject offer");
    }

    try {
      const subjectOfferRequestCreated = await this.repository.update(
        subjectOfferRequest
      );
      const [dataReturn] = await this.repository.findByIds([
        subjectOfferRequestCreated.id,
      ]);

      return dataReturn;
    } catch (error: any) {
      if (error.routine === "_bt_check_unique") {
        Logger.error(error.message);
        throw new DuplicatedEntityError("Request already done");
      }
      Logger.error(error.message);
      throw new InternalServerError("Error on subject offer request");
    }
  }
}
