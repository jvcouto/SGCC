import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Column, Entity, JoinTable, ManyToMany, OneToMany } from "typeorm";
import AbstractBaseModel from "./abstractBase.model";
import User from "./user.model";
import Subject from "./subject.model";
import CourseAdmin from "./courseAdmin.model";

enum DayShift {
  FULLTIME = "fulltime",
  VESPERTINE = "vespertine",
  NOCTURNAL = "nocturnal",
}

@Entity("course")
class Course extends AbstractBaseModel {
  @IsNotEmpty()
  @IsString()
  @Column({ length: 128, unique: true })
  name!: string;

  @IsNotEmpty()
  @IsNumber()
  @Column()
  duration!: number;

  @IsNotEmpty()
  @IsString()
  @Column({ type: "enum", enum: DayShift })
  shift!: string;

  @ManyToMany(() => User, (user) => user.colleges)
  @JoinTable()
  collegeMembers!: User[];

  @OneToMany(() => CourseAdmin, (courseAdmin) => courseAdmin.course, {
    cascade: true,
  })
  admins!: CourseAdmin[];

  @OneToMany(() => Subject, (subject) => subject.course)
  subjects!: Subject[];
}

export default Course;
