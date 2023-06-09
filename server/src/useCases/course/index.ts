import CourseRepository from "@dataAccess/course.repository";
import CreateCourse from "./create";
import ListCourses from "./list";
import FindCourse from "./findOne";

const courseRepository = new CourseRepository();

const createCourse = new CreateCourse(courseRepository);
const listCourses = new ListCourses(courseRepository);
const findCourse = new FindCourse(courseRepository);

export { createCourse, listCourses, findCourse };
