import { IsNotEmpty, IsString } from "class-validator";
import { Column, Entity, JoinTable, ManyToMany, OneToMany } from "typeorm";
import AbstractBaseModel from "./abstractBase.model";
import User from "./user.model";
import CourseAdmin from "./courseAdmin.model";
@Entity("course")
class Course extends AbstractBaseModel {
  @IsNotEmpty()
  @IsString()
  @Column({ length: 128, unique: true })
  name!: string;

  @ManyToMany(() => User)
  @JoinTable()
  collegeMembers!: User[];

  @ManyToMany(() => User)
  @JoinTable()
  teachers!: User[];

  @OneToMany(() => CourseAdmin, (courseAdmins) => courseAdmins.course)
  public courseAdmins!: CourseAdmin[];
}

export default Course;
