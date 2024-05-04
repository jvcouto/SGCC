"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const httpStatusCodes_1 = __importDefault(require("../utils/constants/httpStatusCodes"));
const departament_1 = require("../useCases/departament");
function MakeDepartamentController() {
    const create = async (httpRequest) => {
        const departamentData = await departament_1.createDepartament.execute(httpRequest.body);
        return { status: httpStatusCodes_1.default.CREATED, data: departamentData };
    };
    const list = async (httpRequest) => {
        const [data, count] = await departament_1.listDepartaments.execute(httpRequest.query);
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
        const departament = await departament_1.findOneDepartament.execute(httpRequest.params?.id, httpRequest.query);
        return {
            status: httpStatusCodes_1.default.OK,
            data: departament,
        };
    };
    return Object.freeze({
        create,
        list,
        findOne,
    });
}
exports.default = MakeDepartamentController;
//# sourceMappingURL=departament.controller.js.map