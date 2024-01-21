import Logger from "@utils/logger";
import InternalServerError from "@errors/server.error";
import SubjectOfferRepository from "@dataAccess/subjectOffer.repository";
import DuplicatedEntityError from "@errors/duplicatedEntity.error";
import { IUser } from "src/interfaces/user.interface";
import EntityNotFound from "@errors/entityNotFound.error";
import { UserRoles } from "@utils/constants/userRoles";
import Unauthorized from "@errors/unauthorized.error";

export default class DeleteSubjectRequest {
  constructor(private readonly repository: SubjectOfferRepository) {}

  async execute(params: any, data: any, user?: IUser) {
    const { offerUid }: { offerUid: number; teacherId: string } = params;

    const { teacherId }: { teacherId: string } = data;

    const [subjectOfferFound] = await this.repository.findByIds([
      Number(offerUid),
    ]);

    if (!subjectOfferFound) {
      const errorMessage = "Offer not found!";
      Logger.error(errorMessage);
      throw new EntityNotFound(errorMessage);
    }

    const teacherFoundOnsubjectOffer = subjectOfferFound.teachers.find(
      (e) => e.id === teacherId
    );

    if (!teacherFoundOnsubjectOffer) {
      const errorMessage = "Teacher not related to Subject Offer";
      Logger.error(errorMessage);
      throw new EntityNotFound(errorMessage);
    }

    const userIsEngineer = user?.userRoles.includes(UserRoles.TEACHER);

    const userIsAdmin =
      user?.userRoles.includes(UserRoles.SYSTEM_ADMIN) ||
      user?.userRoles.includes(UserRoles.DEPARTAMENT_ADMIN);

    if (userIsEngineer && !userIsAdmin) {
      if (user?.id !== teacherFoundOnsubjectOffer.id) {
        const errorMessage = "User not Authorized to delete this Subject Offer";
        Logger.error(errorMessage);
        throw new Unauthorized(errorMessage);
      }
    }

    const teachersFiltered = subjectOfferFound.teachers.filter(
      (e) => e.id !== teacherId
    );

    subjectOfferFound.teachers = teachersFiltered;

    try {
      const subjectOfferRequestCreated = await this.repository.update(
        subjectOfferFound
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
