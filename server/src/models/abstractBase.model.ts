import {
  PrimaryGeneratedColumn,
  BeforeInsert,
  BeforeUpdate,
  Column,
} from "typeorm";

import { IsOptional } from "class-validator";

abstract class AbstractBaseModel {
  @PrimaryGeneratedColumn()
  id!: number;

  @IsOptional()
  @Column({
    name: "created_at",
    type: "timestamp",
  })
  createdAt!: Date;

  @IsOptional()
  @Column({
    name: "updated_at",
    type: "timestamp",
    nullable: true,
  })
  updatedAt!: Date;

  @BeforeInsert()
  private setCreatedAt(): void {
    this.createdAt = new Date();
  }
}

export default AbstractBaseModel;
