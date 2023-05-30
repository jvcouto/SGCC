import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  Unique,
} from "typeorm";
import AbstractBaseModel from "./abstractBase.model";
import User from "./user.model";
import Semester from "./semester.model";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import Subject from "./subject.model";

@Entity("subjectOffer")
@Unique(["class", "subject", "semester"])
class SubjectOffer extends AbstractBaseModel {
  @IsOptional()
  @IsString()
  @Column({
    length: 16,
    default: "Unique",
  })
  class!: string;

  @IsNotEmpty()
  @IsNumber()
  @Column()
  places!: number;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @Column({ length: 128 })
  teachingPlan!: string;

  @IsNotEmpty()
  @ManyToOne(() => Semester, { nullable: false })
  semester!: Semester;

  @IsNotEmpty()
  @ManyToOne(() => Subject, { nullable: false })
  subject!: Subject;

  @ManyToMany(() => User)
  @JoinTable()
  teachers!: User[];
}

export default SubjectOffer;
