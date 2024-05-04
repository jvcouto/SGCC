"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const httpStatusCodes_1 = __importDefault(require("../utils/constants/httpStatusCodes"));
const teachingPlan_1 = require("../useCases/teachingPlan");
function MakeTeachingPlanController() {
    const create = async (httpRequest) => {
        const teachingPlanData = await teachingPlan_1.createTeachingPlan.execute(httpRequest.body);
        return { status: httpStatusCodes_1.default.CREATED, data: teachingPlanData };
    };
    const update = async (httpRequest) => {
        const updatedTeachingPlan = await teachingPlan_1.updateTeachingPlan.execute(Number(httpRequest.params?.id), httpRequest.body);
        return { status: httpStatusCodes_1.default.OK, data: updatedTeachingPlan };
    };
    return Object.freeze({
        create,
        update,
    });
}
exports.default = MakeTeachingPlanController;
//# sourceMappingURL=teachingPlan.controller.js.map