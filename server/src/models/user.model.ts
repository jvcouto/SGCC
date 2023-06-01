import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsBoolean,
  IsOptional,
} from "class-validator";
import Course from "./course.model";
@Entity("user")
class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @IsNotEmpty()
  @IsString()
  @Column({
    length: 128,
  })
  name!: string;

  @IsEmail()
  @IsNotEmpty()
  @Column({
    length: 128,
    unique: true,
  })
  email!: string;

  @IsNotEmpty()
  @IsString()
  @Column({
    length: 256,
    select: false,
  })
  password!: string;

  @IsOptional()
  @IsNotEmpty()
  @IsBoolean()
  @Column({ name: "sys_admin", default: false })
  sysAdmin!: boolean;

  @IsOptional()
  @IsNotEmpty()
  @IsBoolean()
  @Column({ name: "fisrt_login", default: true })
  firstLogin!: boolean;

  @ManyToMany(() => Course, (course) => course.collegeMembers)
  colleges!: Course[];

  @ManyToMany(() => Course, (course) => course.teachers)
  teaching!: Course[];

  @ManyToMany(() => Course, (course) => course.admins)
  administrating!: Course[];
}

export default User;
