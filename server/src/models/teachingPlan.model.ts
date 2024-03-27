import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import AbstractBaseModel from "./abstractBase.model";
import { IsNotEmpty, IsString } from "class-validator";
import SubjectOffer from "./subjectOffer.model";

@Entity("teaching_plan")
class TeachingPlan extends AbstractBaseModel {
  @IsNotEmpty()
  @IsString()
  @Column()
  content!: string;

  @IsNotEmpty()
  @IsString()
  @Column()
  methodology!: string;

  @IsNotEmpty()
  @IsString()
  @Column()
  ratingCriteria!: string;

  @IsNotEmpty()
  @IsString()
  @Column()
  substitute!: string;

  @IsNotEmpty()
  @IsString()
  @Column()
  serviceHours!: string;

  @OneToOne(() => SubjectOffer)
  @JoinColumn()
  subjectOffer!: SubjectOffer;
}

export default TeachingPlan;
