import { Column, Entity } from "typeorm";
import { IsString, IsNotEmpty, IsEmail } from "class-validator";
import AbstractBaseEntity from "./AbstractBaseEntity";

@Entity("teacher")
class Teacher extends AbstractBaseEntity {
  @IsNotEmpty()
  @IsString()
  @Column({
    length: 128,
  })
  name!: string;

  @IsNotEmpty()
  @IsString()
  @Column({
    length: 128,
  })
  course!: string;

  @IsEmail()
  @IsNotEmpty()
  @IsString()
  @Column({
    length: 50,
    unique: true,
  })
  email!: string;

  @IsNotEmpty()
  @IsString()
  @Column({
    length: 256,
  })
  password!: string;

  constructor(teacher?: Teacher) {
    super();

    if (teacher) {
      Object.assign(this, teacher);
    }
  }
}

export default Teacher;
