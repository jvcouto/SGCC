import { IsNotEmpty, IsString } from "class-validator";
import { Column, Entity, JoinTable, ManyToMany, OneToMany } from "typeorm";
import AbstractBaseModel from "./abstractBase.model";
import User from "./user.model";
import Subject from "./subject.model";

@Entity("course")
class Course extends AbstractBaseModel {
  @IsNotEmpty()
  @IsString()
  @Column({ length: 128, unique: true })
  name!: string;

  @ManyToMany(() => User, (user) => user.colleges)
  @JoinTable()
  collegeMembers!: User[];

  @ManyToMany(() => User, (user) => user.teaching)
  @JoinTable()
  teachers!: User[];

  @ManyToMany(() => User, (user) => user.administrating)
  @JoinTable()
  admins!: User[];

  @OneToMany(() => Subject, (subject) => subject.course)
  subjects!: Subject[];
}

export default Course;
