import { Column, Entity, Generated, JoinColumn, ManyToOne } from "typeorm";
import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsBoolean,
  IsOptional,
} from "class-validator";
import AbstractBaseEntity from "./AbstractBaseEntity";
import Course from "./CourseEntity";
import UserRole from "./UserRoleEntity";

@Entity("user")
class User extends AbstractBaseEntity {
  @Column({ name: "uuid", type: "uuid" })
  @Generated("uuid")
  uuid!: string;

  @IsNotEmpty()
  @IsString()
  @Column({
    length: 128,
  })
  name!: string;

  @ManyToOne(() => Course)
  @JoinColumn({ name: "course_id" })
  @IsNotEmpty()
  courseId!: string;

  @IsEmail()
  @IsNotEmpty()
  @IsString()
  @Column({
    length: 50,
    unique: true,
  })
  email!: string;

  @ManyToOne(() => UserRole)
  @JoinColumn({ name: "role_id" })
  @IsNotEmpty()
  roleId!: string;

  @IsNotEmpty()
  @IsString()
  @Column({
    length: 256,
  })
  password!: string;

  @IsOptional()
  @IsBoolean()
  @Column({ name: "first_login" })
  firstLogin!: boolean;

  constructor(user?: User) {
    super();

    if (user) {
      Object.assign(this, user);
    }
  }
}

export default User;
