import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  Unique,
} from "typeorm";
import AbstractBaseModel from "./abstractBase.model";
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
} from "class-validator";
import Course from "./course.model";
import Departament from "./departament";
import SubjectOffer from "./subjectOffer.model";

@Entity("subject")
@Unique(["name", "course"]) // curriculo
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

  @ManyToMany(() => Subject)
  @JoinTable()
  preRequisite!: Subject[];

  @ManyToMany(() => Subject)
  @JoinTable()
  coRequisite!: Subject[];

  @IsNotEmpty()
  @IsDate()
  @Column()
  curriculum!: Date;

  @IsNotEmpty()
  @IsString()
  @Column()
  syllabus!: string;

  @IsNotEmpty()
  @IsString()
  @Column()
  objective!: string;

  @IsNotEmpty()
  @IsString()
  @Column()
  bibliography!: string;

  @IsNotEmpty()
  @IsString()
  @Column()
  complementaryBibliography!: string;

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
