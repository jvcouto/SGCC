import { Column, Entity, ManyToOne, Unique } from "typeorm";
import AbstractBaseModel from "./abstractBase.model";
import User from "./user.model";
import Course from "./course.model";
import Semester from "./semester.model";
import { IsBoolean, IsNotEmpty, IsOptional } from "class-validator";
import Subject from "./subject.model";

@Entity("subjectRequest")
@Unique(["subject", "semester", "teacher"])
class SubjectRequest extends AbstractBaseModel {
  @IsNotEmpty()
  @ManyToOne(() => Subject, { nullable: false })
  subject!: Subject;

  @IsNotEmpty()
  @ManyToOne(() => Semester, { nullable: false })
  semester!: Semester;

  @IsNotEmpty()
  @ManyToOne(() => Course, { nullable: false })
  course!: Course;

  @IsNotEmpty()
  @ManyToOne(() => User, { nullable: false })
  teacher!: User;

  @IsOptional()
  @IsBoolean()
  @IsNotEmpty()
  @Column({ default: false })
  denied!: boolean;
}

export default SubjectRequest;
