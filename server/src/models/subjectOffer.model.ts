import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  Unique,
} from "typeorm";
import AbstractBaseModel from "./abstractBase.model";
import User from "./user.model";
import Period from "./period.model";
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";
import Subject from "./subject.model";
import SubjectApprovalHistory from "./subjectApprovalHistory.model";
import TeachingPlan from "./teachingPlan.model";

@Entity("subject_offer")
@Unique(["class", "subject", "period"])
class SubjectOffer extends AbstractBaseModel {
  @IsOptional()
  @IsString()
  @Column({
    length: 16,
    default: "unique",
  })
  class!: string;

  @IsOptional()
  @IsNumber()
  @Column({ nullable: true, default: null })
  places!: number;

  @IsNotEmpty()
  @ManyToOne(() => Period, { nullable: false })
  period!: Period;

  @IsNotEmpty()
  @ManyToOne(() => Subject, { nullable: false })
  subject!: Subject;

  @OneToMany(
    () => SubjectApprovalHistory,
    (subjectApprovalHistory: SubjectApprovalHistory) =>
      subjectApprovalHistory.subjectOffer
  )
  subjectApprovalHistory!: SubjectApprovalHistory[];

  @ManyToMany(() => User)
  @JoinTable()
  teachers!: User[];

  @IsOptional()
  @IsBoolean()
  @IsNotEmpty()
  @Column({ nullable: false, default: false })
  closed!: boolean;

  @OneToOne(() => TeachingPlan, (teachingPlan) => teachingPlan.subjectOffer)
  teachingPlan!: TeachingPlan;
}

export default SubjectOffer;
