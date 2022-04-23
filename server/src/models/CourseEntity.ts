import { IsNotEmpty, IsString } from "class-validator";
import { Column, Entity } from "typeorm";
import AbstractBaseEntity from "./AbstractBaseEntity";

@Entity("course")
class Course extends AbstractBaseEntity {
  @IsNotEmpty()
  @IsString()
  @Column({ length: 128 })
  name!: string;

  constructor(course: Course) {
    super();
    Object.assign(this, course);
  }
}

export default Course;
