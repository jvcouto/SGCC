import { Column, Entity, ManyToOne } from "typeorm";
import AbstractBaseModel from "./abstractBase.model";
import { IsNotEmpty, IsString } from "class-validator";
import User from "./user.model";
import Departament from "./departament";

enum DepartamentAdminRole {
  CHIEF = "chief",
  SUB_CHIEF = "sub-chief",
  SECRETARY = "secretary",
}

@Entity()
class DepartamentAdmin extends AbstractBaseModel {
  @IsNotEmpty()
  @IsString()
  @Column({ type: "enum", enum: DepartamentAdminRole })
  adminRole!: string;

  @ManyToOne(() => Departament, { nullable: false })
  departament!: Departament;

  @ManyToOne(() => User, { nullable: false })
  user!: User;
}

export default DepartamentAdmin;
