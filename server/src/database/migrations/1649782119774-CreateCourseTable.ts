/* eslint-disable class-methods-use-this */
/* eslint-disable import/prefer-default-export */

import path from "path";
import { MigrationInterface, QueryRunner } from "typeorm";
import DBUtils from "@utils/DBUtils";

export class CreateCourseTable1649782119774 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const sql = DBUtils.readSQLFile(
      path.resolve(
        __dirname,
        "../migration-scripts/001-UP-create-course-table.sql"
      )
    );
    await queryRunner.query(sql);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    const sql = DBUtils.readSQLFile(
      path.resolve(
        __dirname,
        "../migration-scripts/001-UP-create-course-table.sql"
      )
    );
    await queryRunner.query(sql);
  }
}
