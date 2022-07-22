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
import User from "./UserEntity";

@Entity("school_class")
class SchoolClass extends AbstractBaseEntity {
  @IsNotEmpty()
  @IsString()
  @Column({ length: 128 })
  name!: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: "teacher_id" })
  @IsNotEmpty()
  teacher!: string;

  @ManyToMany(() => User, { cascade: true })
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
  schoolClassStudens!: User[];

  constructor(schoolClass?: SchoolClass) {
    super();
    Object.assign(this, schoolClass);
  }
}

export default SchoolClass;
