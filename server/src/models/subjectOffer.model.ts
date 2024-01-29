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
  @ManyToOne(() => Period, { nullable: false })
  period!: Period;

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

  @IsOptional()
  @IsBoolean()
  @IsNotEmpty()
  @Column({ nullable: false, default: false })
  closed!: boolean;
}

export default SubjectOffer;
