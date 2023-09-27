import CourseRepository from "@dataAccess/course.repository";
import CreateCourse from "./create";
import ListCourses from "./list";
import FindCourse from "./findOne";
import UpdateCourse from "./update";
import OfferAllRequiredSubjects from "./offerRequiredSubjects";
import SubjectRepository from "@dataAccess/subject.repository";
import SubjectOfferRepository from "@dataAccess/subjectOffer.repository";

const courseRepository = new CourseRepository();
const subjectRepository = new SubjectRepository();
const subjectOfferRepository = new SubjectOfferRepository();

const createCourse = new CreateCourse(courseRepository);
const listCourses = new ListCourses(courseRepository);
const findCourse = new FindCourse(courseRepository);
const updateCourse = new UpdateCourse(courseRepository);
const offerAllCourseRequiredSubjects = new OfferAllRequiredSubjects(
  courseRepository,
  subjectRepository,
  subjectOfferRepository
);

export {
  createCourse,
  listCourses,
  findCourse,
  updateCourse,
  offerAllCourseRequiredSubjects,
};
