import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsBoolean,
  IsOptional,
} from "class-validator";
import Course from "./course.model";
import Departament from "./departament";
import CourseAdmins from "./courseAdmin.model";
import DepartamentAdmin from "./departamentAdmin.model";
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

  @OneToMany(() => CourseAdmins, (courseAdmin) => courseAdmin.user)
  courseAdmin!: CourseAdmins[];

  @OneToMany(
    () => DepartamentAdmin,
    (departamentAdmin) => departamentAdmin.user
  )
  departamentAdmin!: CourseAdmins[];

  @ManyToOne(() => Departament, (departament) => departament.teachers)
  departament!: Departament;
}

export default User;
