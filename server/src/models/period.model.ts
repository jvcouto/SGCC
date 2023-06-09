import { Column, Entity } from "typeorm";
import AbstractBaseModel from "./abstractBase.model";
import { IsDate, IsNotEmpty, IsOptional, IsString } from "class-validator";

@Entity("period")
class Period extends AbstractBaseModel {
  @IsString()
  @IsNotEmpty()
  @Column({ length: 32, unique: true })
  code!: string;

  @IsOptional()
  @IsDate()
  @Column({ type: "date", nullable: true })
  startDate!: string;

  @IsOptional()
  @IsDate()
  @Column({ type: "date", nullable: true })
  endDate!: string;
}

export default Period;
