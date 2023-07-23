import { Column, Entity, ManyToOne } from "typeorm";
import AbstractBaseModel from "./abstractBase.model";
import { IsNotEmpty, IsString } from "class-validator";
import Course from "./course.model";
import User from "./user.model";

enum CourseAdminRole {
  COORDINATOR = "coordinator",
  VICE_COORDINATOR = "vice-coordinator",
  SECRETARY = "secretary",
}

@Entity()
class CourseAdmin extends AbstractBaseModel {
  @IsNotEmpty()
  @IsString()
  @Column({ type: "enum", enum: CourseAdminRole })
  adminRole!: string;

  @IsNotEmpty()
  @ManyToOne(() => Course, { nullable: false })
  course!: Course;

  @IsNotEmpty()
  @ManyToOne(() => User, { nullable: false })
  user!: User;
}

export default CourseAdmin;
