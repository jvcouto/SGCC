import { IsNotEmpty, IsString } from "class-validator";
import { Column, Entity } from "typeorm";
import AbstractBaseModel from "./abstractBase.model";

@Entity("user_role")
class UserRole extends AbstractBaseModel {
  @IsNotEmpty()
  @IsString()
  @Column({ length: 64 })
  name!: string;
}

export default UserRole;
