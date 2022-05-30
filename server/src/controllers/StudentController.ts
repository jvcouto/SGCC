import Student from "@models/StudentEntity";
import AbstractCrudController from "./AbstractController";

class StudentController extends AbstractCrudController<Student> {
  protected Entity = Student;

  protected relations = ["studentSchoolClasses"];
}

export default StudentController;
