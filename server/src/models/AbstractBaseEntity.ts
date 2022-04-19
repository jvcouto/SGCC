import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  BeforeInsert,
  BeforeUpdate,
  UpdateDateColumn,
} from "typeorm";

import { IsOptional } from "class-validator";

abstract class AbstractBaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @IsOptional()
  @CreateDateColumn({
    name: "created_at",
    type: "timestamp",
  })
  createdAt!: Date;

  @IsOptional()
  @UpdateDateColumn({
    name: "updated_at",
    type: "timestamp",
  })
  updatedAt!: Date;

  @BeforeInsert()
  private setCreatedAt(): void {
    this.createdAt = new Date();
  }

  @BeforeUpdate()
  private setUpdatedAt(): void {
    this.updatedAt = new Date();
  }
}

export default AbstractBaseEntity;
