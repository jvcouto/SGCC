"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../../utils/logger"));
const server_error_1 = __importDefault(require("../../errors/server.error"));
const duplicatedEntity_error_1 = __importDefault(require("../../errors/duplicatedEntity.error"));
const entityNotFound_error_1 = __importDefault(require("../../errors/entityNotFound.error"));
const userRoles_1 = require("../../utils/constants/userRoles");
const unauthorized_error_1 = __importDefault(require("../../errors/unauthorized.error"));
class DeleteSubjectRequest {
    constructor(repository) {
        this.repository = repository;
    }
    async execute(params, data, user) {
        const { offerUid } = params;
        const { teacherId } = data;
        const [subjectOfferFound] = await this.repository.findByIds([
            Number(offerUid),
        ]);
        if (!subjectOfferFound) {
            const errorMessage = "Offer not found!";
            logger_1.default.error(errorMessage);
            throw new entityNotFound_error_1.default(errorMessage);
        }
        const teacherFoundOnsubjectOffer = subjectOfferFound.teachers.find((e) => e.id === teacherId);
        if (!teacherFoundOnsubjectOffer) {
            const errorMessage = "Teacher not related to Subject Offer";
            logger_1.default.error(errorMessage);
            throw new entityNotFound_error_1.default(errorMessage);
        }
        const userIsEngineer = user?.userRoles.includes(userRoles_1.UserRoles.TEACHER);
        const userIsAdmin = user?.userRoles.includes(userRoles_1.UserRoles.SYSTEM_ADMIN) ||
            user?.userRoles.includes(userRoles_1.UserRoles.DEPARTAMENT_ADMIN);
        if (userIsEngineer && !userIsAdmin) {
            if (user?.id !== teacherFoundOnsubjectOffer.id) {
                const errorMessage = "User not Authorized to delete this Subject Offer";
                logger_1.default.error(errorMessage);
                throw new unauthorized_error_1.default(errorMessage);
            }
        }
        const teachersFiltered = subjectOfferFound.teachers.filter((e) => e.id !== teacherId);
        subjectOfferFound.teachers = teachersFiltered;
        try {
            const subjectOfferRequestCreated = await this.repository.update(subjectOfferFound);
            const [dataReturn] = await this.repository.findByIds([
                subjectOfferRequestCreated.id,
            ]);
            return dataReturn;
        }
        catch (error) {
            if (error.routine === "_bt_check_unique") {
                logger_1.default.error(error.message);
                throw new duplicatedEntity_error_1.default("Request already done");
            }
            logger_1.default.error(error.message);
            throw new server_error_1.default("Error on subject offer request");
        }
    }
}
exports.default = DeleteSubjectRequest;
//# sourceMappingURL=deleteSubjectRequest.js.map