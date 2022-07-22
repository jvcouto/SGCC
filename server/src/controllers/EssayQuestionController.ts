import EssayQuestion from "@models/EssayQuestionEntity";
import AbstractCrudController from "./AbstractController";

class EssayQuestionController extends AbstractCrudController<EssayQuestion> {
  protected Entity = EssayQuestion;

  protected relations = [];
}

export default EssayQuestionController;
