import CreateCourse from "./create";
// import UpdateUseCase from "./update";
import saveCourse from "@dataAccess/course/save";
import ListCourses from "./list";
import findCourses from "@dataAccess/course/find";
import findOneCourse from "@dataAccess/course/findOne";
import FindCourse from "./findOne";

const createCourse = new CreateCourse(saveCourse);
const listCourses = new ListCourses(findCourses);
const findCourse = new FindCourse(findOneCourse);

export { createCourse, listCourses, findCourse };
