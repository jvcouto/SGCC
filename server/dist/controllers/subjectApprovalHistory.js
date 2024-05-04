"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const httpStatusCodes_1 = __importDefault(require("../utils/constants/httpStatusCodes"));
const subjectApprovalHistory_1 = require("../useCases/subjectApprovalHistory");
const missingParameter_error_1 = __importDefault(require("../errors/missingParameter.error"));
const logger_1 = __importDefault(require("../utils/logger"));
function MakeSubjectApprovalHistoryController() {
    const create = async (httpRequest) => {
        const { params } = httpRequest;
        if (!params?.id) {
            const errorMessage = "Missing subject offer parameter";
            logger_1.default.info(errorMessage);
            throw new missingParameter_error_1.default(errorMessage);
        }
        const newSubjectApprovalHistoryData = {
            ...httpRequest.body,
            evaluator: {
                id: httpRequest.user?.id,
            },
            subjectOffer: {
                id: params.id,
            },
        };
        const subjectApprovalHistoryData = await subjectApprovalHistory_1.createSubjectApprovalHistory.execute(newSubjectApprovalHistoryData);
        return {
            status: httpStatusCodes_1.default.CREATED,
            data: subjectApprovalHistoryData,
        };
    };
    return Object.freeze({
        create,
    });
}
exports.default = MakeSubjectApprovalHistoryController;
//# sourceMappingURL=subjectApprovalHistory.js.map