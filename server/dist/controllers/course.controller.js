"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const course_1 = require("../useCases/course");
const httpStatusCodes_1 = __importDefault(require("../utils/constants/httpStatusCodes"));
function MakeCourseController() {
    const create = async (httpRequest) => {
        const courseData = await course_1.createCourse.execute(httpRequest.body);
        return { status: httpStatusCodes_1.default.CREATED, data: courseData };
    };
    const list = async (httpRequest) => {
        const [data, count] = await course_1.listCourses.execute(httpRequest.query);
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
        const course = await course_1.findCourse.execute(httpRequest.params?.id, httpRequest.query);
        return { status: httpStatusCodes_1.default.OK, data: course };
    };
    const update = async (httpRequest) => {
        const updatedCourse = await course_1.updateCourse.execute(Number(httpRequest.params?.id), httpRequest.body);
        return { status: httpStatusCodes_1.default.OK, data: updatedCourse };
    };
    const offerAllRequiredSubjects = async (httpRequest) => {
        const subjectOffers = await course_1.offerAllCourseRequiredSubjects.execute(Number(httpRequest.params?.id), httpRequest.body);
        return { status: httpStatusCodes_1.default.CREATED, data: subjectOffers };
    };
    const downloadCourseOffersPDF = async (httpRequest) => {
        const data = await course_1.courseOffersPDF.execute(Number(httpRequest.params?.id), httpRequest.query);
        return { status: httpStatusCodes_1.default.OK, data: data };
    };
    return Object.freeze({
        create,
        list,
        findOne,
        update,
        offerAllRequiredSubjects,
        downloadCourseOffersPDF,
    });
}
exports.default = MakeCourseController;
//# sourceMappingURL=course.controller.js.map