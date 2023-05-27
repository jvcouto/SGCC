import { IsNotEmpty, IsString } from "class-validator";
import { Column, Entity, JoinTable, ManyToMany } from "typeorm";
import AbstractBaseModel from "./abstractBase.model";
import User from "./user.model";

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

  @ManyToMany(() => User)
  @JoinTable()
  admins!: User[];
}

export default Course;
