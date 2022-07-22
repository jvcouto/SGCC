import { IsNotEmpty, IsString } from "class-validator";
import { Column, Entity } from "typeorm";
import AbstractBaseEntity from "./AbstractBaseEntity";

@Entity("essay_questions")
class EssayQuestion extends AbstractBaseEntity {
  @IsNotEmpty()
  @IsString()
  @Column({ length: 512 })
  statement!: string;

  constructor(essayQuestion?: EssayQuestion) {
    super();
    Object.assign(this, essayQuestion);
  }
}

export default EssayQuestion;
