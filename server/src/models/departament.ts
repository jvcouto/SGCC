import { Column, Entity, OneToMany } from "typeorm";
import AbstractBaseModel from "./abstractBase.model";
import { IsString, IsNotEmpty } from "class-validator";
import User from "./user.model";

@Entity("departament")
class Departament extends AbstractBaseModel {
  @IsString()
  @IsNotEmpty()
  @Column({ length: 128, unique: true })
  name!: string;

  @IsString()
  @IsNotEmpty()
  @Column({ length: 32, unique: true })
  code!: string;

  @OneToMany(() => User, (user) => user.departament)
  teachers!: User[];
}

export default Departament;
