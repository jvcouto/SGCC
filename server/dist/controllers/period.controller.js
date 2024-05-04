"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const httpStatusCodes_1 = __importDefault(require("../utils/constants/httpStatusCodes"));
const period_1 = require("../useCases/period");
function MakePeriodController() {
    const create = async (httpRequest) => {
        const periodData = await period_1.createPeriod.execute(httpRequest.body);
        return { status: httpStatusCodes_1.default.CREATED, data: periodData };
    };
    const list = async (httpRequest) => {
        const [data, count] = await period_1.listPeriods.execute(httpRequest.query);
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
    const findOne = async (httpRequest) => {
        const course = await period_1.findPeriod.execute(httpRequest.params?.id);
        return { status: httpStatusCodes_1.default.OK, data: course };
    };
    return Object.freeze({
        create,
        list,
        findOne,
    });
}
exports.default = MakePeriodController;
//# sourceMappingURL=period.controller.js.map