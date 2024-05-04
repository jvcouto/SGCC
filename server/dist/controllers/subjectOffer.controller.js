"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const httpStatusCodes_1 = __importDefault(require("../utils/constants/httpStatusCodes"));
const subjectOffer_1 = require("../useCases/subjectOffer");
const logger_1 = __importDefault(require("../utils/logger"));
const missingParameter_error_1 = __importDefault(require("../errors/missingParameter.error"));
function MakeSubjectOfferController() {
    const create = async (httpRequest) => {
        const subjectOfferData = await subjectOffer_1.createSubjectOffer.execute(httpRequest.body);
        return { status: httpStatusCodes_1.default.CREATED, data: subjectOfferData };
    };
    const request = async (httpRequest) => {
        const requestData = await subjectOffer_1.requestSubjectOffer.execute(httpRequest.params, httpRequest.user);
        return { status: httpStatusCodes_1.default.OK, data: requestData };
    };
    const deleteRequest = async (httpRequest) => {
        const requestData = await subjectOffer_1.deleteSubjectRequest.execute(httpRequest.params, httpRequest.body, httpRequest.user);
        return { status: httpStatusCodes_1.default.OK, data: requestData };
    };
    const update = async (httpRequest) => {
        const responseData = await subjectOffer_1.updateSubjectOffer.execute(httpRequest.params?.offerUid, httpRequest.body);
        return { status: httpStatusCodes_1.default.OK, data: responseData };
    };
    const close = async (httpRequest) => {
        await subjectOffer_1.closeSubjectOffer.execute(httpRequest.body);
        return { status: httpStatusCodes_1.default.OK };
    };
    const getTeachers = async (httpRequest) => {
        const { params } = httpRequest;
        if (!params?.offerId) {
            const errorMessage = "Missing subject offer parameter";
            logger_1.default.info(errorMessage);
            throw new missingParameter_error_1.default(errorMessage);
        }
        const data = await subjectOffer_1.getOfferTeachers.execute(Number(params.offerId));
        return { status: httpStatusCodes_1.default.OK, data };
    };
    const list = async (httpRequest) => {
        const [data, count] = await subjectOffer_1.listSubjectOffers.execute(httpRequest.user, httpRequest.query);
        return {
            status: httpStatusCodes_1.default.OK,
            data,
            meta: {
                total: count,
                page: Number(httpRequest.query?.page),
                pageSize: httpRequest.query?.page_size,
            },
        };
    };
    const findOne = async (httpRequest) => {
        const data = await subjectOffer_1.findOneOffer.execute(httpRequest.params?.id, httpRequest.user);
        return {
            status: httpStatusCodes_1.default.OK,
            data,
        };
    };
    return Object.freeze({
        create,
        request,
        deleteRequest,
        update,
        close,
        getTeachers,
        list,
        findOne,
    });
}
exports.default = MakeSubjectOfferController;
//# sourceMappingURL=subjectOffer.controller.js.map