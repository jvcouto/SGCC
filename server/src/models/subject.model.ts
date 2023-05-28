import { Column, Entity, ManyToOne, Unique } from "typeorm";
import AbstractBaseModel from "./abstractBase.model";
import { IsNotEmpty, IsString } from "class-validator";
import Course from "./course.model";

@Entity("subject")
@Unique(["name", "course"])
class Subject extends AbstractBaseModel {
  @IsString()
  @IsNotEmpty()
  @Column({ length: 128 })
  name!: string;

  @ManyToOne(() => Course, (course) => course.subjects)
  course!: Course;
}

export default Subject;
