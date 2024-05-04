"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../../utils/logger"));
const subjectOffer_model_1 = __importDefault(require("../../models/subjectOffer.model"));
const class_validator_1 = require("class-validator");
const invalidAttribute_error_1 = __importDefault(require("../../errors/invalidAttribute.error"));
const entityNotFound_error_1 = __importDefault(require("../../errors/entityNotFound.error"));
const server_error_1 = __importDefault(require("../../errors/server.error"));
const duplicatedEntity_error_1 = __importDefault(require("../../errors/duplicatedEntity.error"));
class OfferAllRequiredSubjects {
    constructor(repository, subjectRepository, subjectOfferRepository) {
        this.repository = repository;
        this.subjectRepository = subjectRepository;
        this.subjectOfferRepository = subjectOfferRepository;
    }
    async execute(courseId, data) {
        const { periodId, addRequired, addOptional } = data;
        const courseSubjects = await this.subjectRepository.findSubjectsByCourse(courseId, addRequired, addOptional);
        if (!courseSubjects.length) {
            const errorMessage = "Course dont have subjects to add";
            logger_1.default.error(errorMessage);
            throw new entityNotFound_error_1.default(errorMessage);
        }
        const alreadyExistingSubjects = await this.subjectOfferRepository.findExistentBulkSubject(courseId, periodId, addRequired, addOptional);
        const alreadyExistingSubjectsIDs = alreadyExistingSubjects.map((e) => e.subject.id);
        const nonExistentSubject = courseSubjects.filter((e) => !alreadyExistingSubjectsIDs.includes(e.id));
        const requiredSubjectOffersData = nonExistentSubject.map((eachSubject) => {
            return Object.assign(new subjectOffer_model_1.default(), {
                period: {
                    id: periodId,
                },
                subject: {
                    id: eachSubject.id,
                },
                places: eachSubject.places,
            });
        });
        const errors = await (0, class_validator_1.validate)(requiredSubjectOffersData);
        if (errors.length > 0) {
            const formatedError = errors.map((error) => error.constraints);
            logger_1.default.error(JSON.stringify(formatedError));
            throw new invalidAttribute_error_1.default("Error offering subjects");
        }
        try {
            const subjectOffers = await this.subjectOfferRepository.bulkCreate(requiredSubjectOffersData);
            return await this.subjectOfferRepository.findByIds(subjectOffers.map((eachSubjectOffer) => eachSubjectOffer.id));
        }
        catch (error) {
            if (error.routine === "_bt_check_unique") {
                logger_1.default.error(error.message);
                throw new duplicatedEntity_error_1.default("Duplicated subject offer");
            }
            logger_1.default.error(error.message);
            throw new server_error_1.default("Error Offering subjects");
        }
    }
}
exports.default = OfferAllRequiredSubjects;
//# sourceMappingURL=offerRequiredSubjects.js.map