// disciplina sera por curso

import { Column, Entity } from "typeorm";
import AbstractBaseModel from "./abstractBase.model";
import { IsDate, IsNotEmpty, IsString } from "class-validator";

@Entity("semester")
class Semester extends AbstractBaseModel {
  @IsString()
  @IsNotEmpty()
  @Column({ length: 32, unique: true })
  code!: string;

  @IsDate()
  @Column({ type: "date", nullable: true })
  startDate!: string;

  @IsDate()
  @Column({ type: "date", nullable: true })
  endDate!: string;
}

export default Semester;
