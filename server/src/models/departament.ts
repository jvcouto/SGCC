import { Column, Entity, OneToMany } from "typeorm";
import AbstractBaseModel from "./abstractBase.model";
import { IsString, IsNotEmpty } from "class-validator";
import User from "./user.model";
import DepartamentAdmin from "./departamentAdmin.model";
import Subject from "./subject.model";

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

  @OneToMany(
    () => DepartamentAdmin,
    (departamentAdmin) => departamentAdmin.departament,
    {
      cascade: true,
    }
  )
  admins!: DepartamentAdmin[];

  @OneToMany(() => User, (user) => user.departament)
  teachers!: User[];

  @OneToMany(() => Subject, (subject) => subject.departament)
  subjects!: Subject[];
}

export default Departament;
