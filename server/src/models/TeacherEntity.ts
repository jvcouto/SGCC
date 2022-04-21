import { Column, Entity, Generated, JoinColumn, ManyToOne } from "typeorm";
import { IsString, IsNotEmpty, IsEmail } from "class-validator";
import AbstractBaseEntity from "./AbstractBaseEntity";
import Course from "./CourseEntity";

@Entity("teacher")
class Teacher extends AbstractBaseEntity {
  @Column({ name: "uuid", type: "uuid" })
  @Generated("uuid")
  uuid!: string;

  @IsNotEmpty()
  @IsString()
  @Column({
    length: 128,
  })
  name!: string;

  @ManyToOne(() => Course)
  @JoinColumn({ name: "course_id" })
  @IsNotEmpty()
  courseId!: string;

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

  constructor(teacher?: Teacher) {
    super();

    if (teacher) {
      Object.assign(this, teacher);
    }
  }
}

export default Teacher;
