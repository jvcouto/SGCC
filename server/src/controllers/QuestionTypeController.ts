import QuestionType from "@models/QuestionTypeEntity";
import AbstractCrudController from "./AbstractController";

class QuestionTypeController extends AbstractCrudController<QuestionType> {
  protected Entity = QuestionType;

  protected relations = [];
}

export default QuestionTypeController;
