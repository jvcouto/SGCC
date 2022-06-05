CREATE TABLE IF NOT EXISTS "course" (
    "id" BIGSERIAL PRIMARY KEY,
    "name" VARCHAR(128) NOT NULL,
    "created_at" TIMESTAMP NULL DEFAULT NULL,
    "updated_at" TIMESTAMP NULL DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS "user_role" (
    "id" BIGSERIAL PRIMARY KEY,
    "name" VARCHAR(128) NOT NULL,
    "created_at" TIMESTAMP NULL DEFAULT NULL,
    "updated_at" TIMESTAMP NULL DEFAULT NULL
);

INSERT INTO "user_role" (name, created_at) VALUES
('student', '2022-04-23 21:11:54.649'),
('teacher', '2022-04-23 21:11:54.649');

CREATE TABLE IF NOT EXISTS "user" (
    "id" BIGSERIAL PRIMARY KEY,
    "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(),
    "name" VARCHAR(128) NOT NULL,
    "course_id" BIGINT NOT NULL REFERENCES "course" ("id"),
    "role_id" BIGINT NOT NULL REFERENCES "user_role" ("id"),
    "email" VARCHAR(50) NOT NULL UNIQUE,
    "password" VARCHAR(256) NOT NULL,
    "first_login" BOOLEAN NOT NULL DEFAULT TRUE,
    "created_at" TIMESTAMP NULL DEFAULT NULL,
    "updated_at" TIMESTAMP NULL DEFAULT NULL
);

CREATE INDEX ON "user" USING btree ("course_id");
CREATE INDEX ON "user" USING btree ("role_id");


CREATE TABLE IF NOT EXISTS "school_class" (
    "id" BIGSERIAL PRIMARY KEY,
    "name" VARCHAR(128) NOT NULL,
    "teacher_id" BIGINT NOT NULL REFERENCES "user" ("id"),
    "created_at" TIMESTAMP NULL DEFAULT NULL,
    "updated_at" TIMESTAMP NULL DEFAULT NULL
);

CREATE INDEX ON "school_class" USING btree ("teacher_id");


CREATE TABLE IF NOT EXISTS "school_class_students" (
    "id" BIGSERIAL PRIMARY KEY,
    "school_class_id" BIGINT NOT NULL REFERENCES "school_class" ("id"), 
    "student_id" BIGINT NOT NULL REFERENCES "user" ("id"),
    "created_at" TIMESTAMP NULL DEFAULT NULL,
    "updated_at" TIMESTAMP NULL DEFAULT NULL,
    UNIQUE("student_id","school_class_id")
);

CREATE INDEX ON "school_class_students" USING btree ("school_class_id");
CREATE INDEX ON "school_class_students" USING btree ("student_id");