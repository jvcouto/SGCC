import { Column, Entity, ManyToOne, OneToMany, Unique } from "typeorm";
import AbstractBaseModel from "./abstractBase.model";
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";
import Course from "./course.model";
import Departament from "./departament";
import SubjectOffer from "./subjectOffer.model";

@Entity("subject")
@Unique(["name", "course"])
class Subject extends AbstractBaseModel {
  @IsString()
  @IsNotEmpty()
  @Column({ length: 128 })
  name!: string;

  @IsString()
  @IsNotEmpty()
  @Column({ length: 64 })
  shortName!: string;

  @IsNotEmpty()
  @IsNumber()
  @Column()
  places!: number;

  @IsNumber()
  @IsNotEmpty()
  @Column()
  semester!: number;

  @IsNotEmpty()
  @IsNumber()
  @Column()
  workload!: number;

  @IsNotEmpty()
  @IsNumber()
  @Column()
  theoreticalWorkload!: number;

  @IsNotEmpty()
  @IsNumber()
  @Column()
  praticalWorkload!: number;

  @IsNotEmpty()
  @IsBoolean()
  @Column()
  optionalSubject!: boolean;

  @IsNotEmpty()
  @ManyToOne(() => Course, (course: Course) => course.subjects, {
    nullable: false,
  })
  course!: Course;

  @IsNotEmpty()
  @ManyToOne(() => Departament, {
    nullable: false,
  })
  departament!: Departament;

  @OneToMany(
    () => SubjectOffer,
    (subjectOffer: SubjectOffer) => subjectOffer.subject
  )
  offers!: SubjectOffer[];
}

export default Subject;
