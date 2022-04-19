import { BeforeInsert, Column, Entity } from "typeorm";
import { IsString } from "class-validator";
import AbstractBaseEntity from "./AbstractBaseEntity";

@Entity("teacher")
class Teacher extends AbstractBaseEntity {
  @Column({
    length: 128,
  })
  name!: string;

  @IsString()
  @Column({
    length: 128,
  })
  course!: string;

  @IsString()
  @Column({
    length: 50,
    unique: true,
  })
  email!: string;

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
