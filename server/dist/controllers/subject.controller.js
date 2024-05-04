"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const httpStatusCodes_1 = __importDefault(require("../utils/constants/httpStatusCodes"));
const subject_1 = require("../useCases/subject");
function MakeSubjectController() {
    const create = async (httpRequest) => {
        const subjectData = await subject_1.createSubject.execute(httpRequest.body);
        return { status: httpStatusCodes_1.default.CREATED, data: subjectData };
    };
    const list = async (httpRequest) => {
        const [data, count] = await subject_1.listSubjects.execute(httpRequest.query);
        return {
            status: httpStatusCodes_1.default.OK,
            data: data,
            meta: {
                total: count,
                page: httpRequest.query?.page,
                pageSize: httpRequest.query?.page_size,
            },
        };
    };
    return Object.freeze({
        create,
        list,
    });
}
exports.default = MakeSubjectController;
//# sourceMappingURL=subject.controller.js.map