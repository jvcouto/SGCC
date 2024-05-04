"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pdfkit_1 = __importDefault(require("pdfkit"));
const entityNotFound_error_1 = __importDefault(require("../../errors/entityNotFound.error"));
const logger_1 = __importDefault(require("../../utils/logger"));
const server_error_1 = __importDefault(require("../../errors/server.error"));
class CourseOffersPDF {
    constructor(repository, pdfService) {
        this.repository = repository;
        this.pdfService = pdfService;
    }
    async execute(id, query) {
        try {
            const courseFound = await this.repository.findOne(id, query);
            if (!courseFound)
                throw new entityNotFound_error_1.default("Course not found");
            const offerByDepartament = courseFound.subjects.reduce((acc, curr) => {
                const currentSubjectDepName = curr.departament.name;
                if (acc[currentSubjectDepName]) {
                    acc[currentSubjectDepName] = [...acc[currentSubjectDepName], curr];
                    return acc;
                }
                acc[currentSubjectDepName] = [curr];
                return acc;
            }, {});
            var myDoc = new pdfkit_1.default({ bufferPages: true });
            this.pdfService.startDoc(myDoc);
            this.pdfService.writeTitle(`Curso de ${courseFound.name}`);
            this.pdfService.horizontalDivisor();
            for (const [departament, subjects] of Object.entries(offerByDepartament)) {
                this.pdfService.writeSubTitle(departament);
                myDoc.list([subjects.map((e) => e.name)]);
            }
            return myDoc;
        }
        catch (error) {
            logger_1.default.error(error.message);
            throw new server_error_1.default("Error getting course offers pdf");
        }
    }
}
exports.default = CourseOffersPDF;
//# sourceMappingURL=downloadCourseOffers.js.map