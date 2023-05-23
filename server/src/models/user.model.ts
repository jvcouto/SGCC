import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsBoolean,
  IsOptional,
} from "class-validator";

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
  @Column({
    length: 128,
    unique: true,
  })
  email!: string;

  @ManyToMany(() => UserRole)
  @JoinTable()
  roles!: UserRole[];

  @IsNotEmpty()
  @IsString()
  @Column({
    length: 256,
  })
  password!: string;

  @IsOptional()
  @IsBoolean()
  @Column({ name: "fisrt_login", default: true })
  firstLogin!: boolean;
}

export default User;
