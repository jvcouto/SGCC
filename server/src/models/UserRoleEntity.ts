import { IsNotEmpty, IsString } from "class-validator";
import { Column, Entity } from "typeorm";
import AbstractBaseEntity from "./AbstractBaseEntity";

@Entity("user_role")
class UserRole extends AbstractBaseEntity {
  @IsNotEmpty()
  @IsString()
  @Column({ length: 128 })
  name!: string;

  constructor(role?: UserRole) {
    super();
    Object.assign(this, role);
  }
}

export default UserRole;
