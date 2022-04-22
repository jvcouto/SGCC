/* eslint-disable class-methods-use-this */
/* eslint-disable import/prefer-default-export */

import { MigrationInterface, QueryRunner } from "typeorm";
import path from "path";
import DBUtils from "@utils/DBUtils";

export class CreateTeacherTable1650476066758 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const sql = DBUtils.readSQLFile(
      path.resolve(
        __dirname,
        "../migration-scripts/002-UP-create-teacher-table.sql"
      )
    );
    await queryRunner.query(sql);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const sql = DBUtils.readSQLFile(
      path.resolve(
        __dirname,
        "../migration-scripts/002-DOWN-create-teacher-table.sql"
      )
    );
    await queryRunner.query(sql);
  }
}
