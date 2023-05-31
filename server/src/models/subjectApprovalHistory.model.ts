import { Column, Entity, ManyToOne } from "typeorm";
import AbstractBaseModel from "./abstractBase.model";
import SubjectOffer from "./subjectOffer.model";
import { IsBoolean, IsOptional, IsString } from "class-validator";
import User from "./user.model";

@Entity("subjectApprovalHistory")
class SubjectApprovalHistory extends AbstractBaseModel {
  @IsOptional()
  @IsString()
  @Column({ type: "text", nullable: true })
  comment!: string;

  @IsOptional()
  @IsBoolean()
  @Column({ default: false })
  approve!: boolean;

  @ManyToOne(() => User)
  evaluator!: User;

  @ManyToOne(
    () => SubjectOffer,
    (subjectOffer) => subjectOffer.subjectApprovalHistory
  )
  subjectOffer!: SubjectOffer;
}

export default SubjectApprovalHistory;
