import { IsNotEmpty, IsString, IsEmail } from "class-validator";
import { Entity, Column, Generated, ManyToMany, JoinTable } from "typeorm";
import AbstractBaseEntity from "./AbstractBaseEntity";
import SchoolClass from "./SchoolClassEntity";

@Entity("teacher")
class Student extends AbstractBaseEntity {
  @Column({ name: "uuid", type: "uuid" })
  @Generated("uuid")
  uuid!: string;

  @IsNotEmpty()
  @IsString()
  @Column({
    length: 128,
  })
  name!: string;

  @IsEmail()
  @IsNotEmpty()
  @IsString()
  @Column({
    length: 50,
    unique: true,
  })
  email!: string;

  @IsNotEmpty()
  @IsString()
  @Column({
    length: 256,
  })
  password!: string;

  @ManyToMany(() => SchoolClass, { cascade: false })
  @JoinTable({
    name: "school_class_students",
    joinColumn: {
      name: "student_id",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "school_class_id",
      referencedColumnName: "id",
    },
  })
  @IsNotEmpty()
  studentSchoolClasses!: SchoolClass[];

  constructor(student?: Student) {
    super();

    if (student) {
      Object.assign(this, student);
    }
  }
}

export default Student;
