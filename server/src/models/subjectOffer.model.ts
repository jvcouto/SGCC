import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  Unique,
} from "typeorm";
import AbstractBaseModel from "./abstractBase.model";
import User from "./user.model";
import Semester from "./period.model";
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";
import Subject from "./subject.model";
import SubjectApprovalHistory from "./subjectApprovalHistory.model";
import Course from "./course.model";

@Entity("subject_offer")
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
  @Column({ length: 128, nullable: true })
  teachingPlan!: string;

  @IsOptional()
  @IsNotEmpty()
  @IsBoolean()
  @Column({ default: false })
  teachingPlanApproved!: boolean;

  @IsNotEmpty()
  @ManyToOne(() => Semester, { nullable: false })
  semester!: Semester;

  @IsNotEmpty()
  @ManyToOne(() => Subject, { nullable: false })
  subject!: Subject;

  @OneToMany(
    () => SubjectApprovalHistory,
    (subjectApprovalHistory) => subjectApprovalHistory.subjectOffer
  )
  subjectApprovalHistory!: SubjectOffer;

  @ManyToMany(() => User)
  @JoinTable()
  teachers!: User[];
}

export default SubjectOffer;
