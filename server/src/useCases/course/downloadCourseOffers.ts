import PDFDocument from "pdfkit";
import EntityNotFound from "@errors/entityNotFound.error";
import CourseRepository from "@dataAccess/course.repository";
import Logger from "@utils/logger";
import InternalServerError from "@errors/server.error";
import PDFService from "src/services/pdf.service";
import Subject from "@models/subject.model";

export default class CourseOffersPDF {
  constructor(
    private readonly repository: CourseRepository,
    private readonly pdfService: PDFService
  ) {}

  async execute(id: number, query: unknown) {
    try {
      const courseFound = await this.repository.findOne(id, query);
      if (!courseFound) throw new EntityNotFound("Course not found");

      const offerByDepartament = courseFound.subjects.reduce((acc, curr) => {
        const currentSubjectDepName = curr.departament.name;
        if (acc[currentSubjectDepName]) {
          acc[currentSubjectDepName] = [...acc[currentSubjectDepName], curr];
          return acc;
        }

        acc[currentSubjectDepName] = [curr];
        return acc;
      }, {} as { [k: string]: Subject[] });

      var myDoc = new PDFDocument({ bufferPages: true });

      this.pdfService.startDoc(myDoc);

      this.pdfService.writeTitle(`Curso de ${courseFound.name}`);
      this.pdfService.horizontalDivisor();

      for (const [departament, subjects] of Object.entries(
        offerByDepartament
      )) {
        this.pdfService.writeSubTitle(departament);

        myDoc.list([subjects.map((e) => e.name)]);
      }

      return myDoc;
    } catch (error: any) {
      Logger.error(error.message);
      throw new InternalServerError("Error getting course offers pdf");
    }
  }
}
