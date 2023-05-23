import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1684803047602 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      "INSERT INTO public.user_role (id, name, created_at) \
        VALUES \
            (1, 'ADMIN', '2023-05-23T00:57:50.038Z'), \
            (2, 'TEACHER', '2023-05-23T00:57:50.038Z'), \
            (3, 'COLLEGE_MEMBER', '2023-05-23T00:57:50.038Z');"
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable("public.user_role");
  }
}
