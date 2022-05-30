import { IsNotEmpty, IsString } from "class-validator";
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
} from "typeorm";
import AbstractBaseEntity from "./AbstractBaseEntity";
import Teacher from "./TeacherEntity";
import Student from "./StudentEntity";

@Entity("school_class")
class SchoolClass extends AbstractBaseEntity {
  @IsNotEmpty()
  @IsString()
  @Column({ length: 128 })
  name!: string;

  @ManyToOne(() => Teacher)
  @JoinColumn({ name: "teacher_id" })
  @IsNotEmpty()
  teacherId!: string;

  @ManyToMany(() => Student, { cascade: true })
  @JoinTable({
    name: "school_class_students",
    joinColumn: {
      name: "school_class_id",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "student_id",
      referencedColumnName: "id",
    },
  })
  @IsNotEmpty()
  schoolClassStudens!: Student[];

  constructor(schoolClass?: SchoolClass) {
    super();
    Object.assign(this, schoolClass);
  }
}

export default SchoolClass;
