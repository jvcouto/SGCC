import { IsNotEmpty, IsString } from "class-validator";
import { Column, Entity } from "typeorm";
import AbstractBaseEntity from "./AbstractBaseEntity";

@Entity("question_type")
class QuestionType extends AbstractBaseEntity {
  @IsNotEmpty()
  @IsString()
  @Column({ length: 128 })
  name!: string;

  constructor(questionType?: QuestionType) {
    super();
    Object.assign(this, questionType);
  }
}

export default QuestionType;
