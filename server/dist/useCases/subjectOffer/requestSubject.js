"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const class_validator_1 = require("class-validator");
const logger_1 = __importDefault(require("../../utils/logger"));
const invalidAttribute_error_1 = __importDefault(require("../../errors/invalidAttribute.error"));
const server_error_1 = __importDefault(require("../../errors/server.error"));
const subjectOffer_model_1 = __importDefault(require("../../models/subjectOffer.model"));
const duplicatedEntity_error_1 = __importDefault(require("../../errors/duplicatedEntity.error"));
const entityNotFound_error_1 = __importDefault(require("../../errors/entityNotFound.error"));
const operationNotAllowed_1 = __importDefault(require("../../errors/operationNotAllowed"));
class RequestSubjectOffer {
    constructor(repository) {
        this.repository = repository;
    }
    async execute(params, user) {
        const { offerUid } = params;
        const [subjectOfferFound] = await this.repository.findByIds([
            Number(offerUid),
        ]);
        if (!subjectOfferFound) {
            const errorMessage = "Offer not found!";
            logger_1.default.error(errorMessage);
            throw new entityNotFound_error_1.default(errorMessage);
        }
        if (subjectOfferFound.closed) {
            const errorMessage = "Offer closed!";
            logger_1.default.error(errorMessage);
            throw new operationNotAllowed_1.default(errorMessage);
        }
        const subjectOfferRequest = Object.assign(new subjectOffer_model_1.default(), {
            id: Number(offerUid),
            teachers: [
                {
                    id: user?.id,
                },
            ],
        });
        if (subjectOfferRequest?.teachers?.length) {
            subjectOfferRequest.teachers = [
                ...subjectOfferFound.teachers,
                ...subjectOfferRequest.teachers,
            ];
        }
        const errors = await (0, class_validator_1.validate)(subjectOfferRequest, {
            skipUndefinedProperties: true,
        });
        if (errors.length > 0) {
            const formatedError = errors.map((error) => error.constraints);
            logger_1.default.error(JSON.stringify(formatedError));
            throw new invalidAttribute_error_1.default("Error requesting subject offer");
        }
        try {
            const subjectOfferRequestCreated = await this.repository.update(subjectOfferRequest);
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
exports.default = RequestSubjectOffer;
//# sourceMappingURL=requestSubject.js.map