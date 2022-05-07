import Course from "@models/CourseEntity";
import AbstractCrudController from "./AbstractController";

class CourseController extends AbstractCrudController<Course> {
  protected Entity = Course;
}

export default CourseController;
