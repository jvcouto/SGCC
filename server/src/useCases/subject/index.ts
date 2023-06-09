import SubjectRepository from "@dataAccess/subject.repository";
import CreateSubject from "./create";
import ListSubjects from "./list";

const subjectRepository = new SubjectRepository();

const createSubject = new CreateSubject(subjectRepository);

const listSubjects = new ListSubjects(subjectRepository);

export { createSubject, listSubjects };
