import CreateCourse from "./create";
// import UpdateUseCase from "./update";

import saveCourse from "@dataAccess/course/save";

const createCourse = new CreateCourse(saveCourse);

export { createCourse };
