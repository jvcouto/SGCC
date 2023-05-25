import { Entity, Column, ManyToOne } from "typeorm";
import { IsBoolean } from "class-validator";
import Course from "./course.model";
import User from "./user.model";
import AbstractBaseModel from "./abstractBase.model";

@Entity()
class CourseAdmin extends AbstractBaseModel {
  @Column()
  public courseId!: number;

  @Column()
  public userId!: number;

  @IsBoolean()
  @Column({ default: false })
  public isCoordinator!: boolean;

  @ManyToOne(() => Course, (course) => course.courseAdmins)
  public course!: Course;

  @ManyToOne(() => User, (user) => user.courseAdmins)
  public user!: User;
}

export default CourseAdmin;
