import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { IsString, IsNotEmpty, IsEmail, IsBoolean } from "class-validator";

import UserRole from "./userRole.model";

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
  @IsString()
  @Column({
    length: 128,
    unique: true,
  })
  email!: string;

  @ManyToMany(() => UserRole)
  @JoinTable()
  userRoles!: UserRole[];

  @IsNotEmpty()
  @IsString()
  @Column({
    length: 256,
  })
  password!: string;

  @IsBoolean()
  @Column({ name: "fisrt_login", default: true })
  firstLogin!: boolean;

  constructor(user?: User) {
    if (user) {
      Object.assign(this, user);
    }
  }
}

export default User;
