CREATE TABLE IF NOT EXISTS "course" (
    "id" BIGSERIAL PRIMARY KEY,
    "name" VARCHAR(128) NOT NULL,
    "created_at" TIMESTAMP NULL DEFAULT NULL,
    "updated_at" TIMESTAMP NULL DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS "teacher" (
    "id" BIGSERIAL PRIMARY KEY,
    "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(),
    "name" VARCHAR(128) NOT NULL,
    "course_id" BIGINT NOT NULL REFERENCES "course" ("id"),
    "email" VARCHAR(50) NOT NULL UNIQUE,
    "password" VARCHAR(256) NOT NULL,
    "created_at" TIMESTAMP NULL DEFAULT NULL,
    "updated_at" TIMESTAMP NULL DEFAULT NULL
);

CREATE INDEX ON "teacher" USING btree ("course_id");


CREATE TABLE IF NOT EXISTS "school_class" (
    "id" BIGSERIAL PRIMARY KEY,
    "name" VARCHAR(128) NOT NULL,
    "teacher_id" BIGINT NOT NULL REFERENCES "teacher" ("id"),
    "created_at" TIMESTAMP NULL DEFAULT NULL,
    "updated_at" TIMESTAMP NULL DEFAULT NULL
);

CREATE INDEX ON "school_class" USING btree ("teacher_id");


CREATE TABLE IF NOT EXISTS "student" (
    "id" BIGSERIAL PRIMARY KEY,
    "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(),
    "name" VARCHAR(128) NOT NULL,
    "email" VARCHAR(50) NOT NULL UNIQUE,
    "password" VARCHAR(256) NOT NULL,
    "created_at" TIMESTAMP NULL DEFAULT NULL,
    "updated_at" TIMESTAMP NULL DEFAULT NULL
);


CREATE TABLE IF NOT EXISTS "school_class_students" (
    "id" BIGSERIAL PRIMARY KEY,
    "school_class_id" BIGINT NOT NULL REFERENCES "school_class" ("id"), 
    "student_id" BIGINT NOT NULL REFERENCES "student" ("id"),
    "created_at" TIMESTAMP NULL DEFAULT NULL,
    "updated_at" TIMESTAMP NULL DEFAULT NULL,
    UNIQUE("student_id","school_class_id")
);

CREATE INDEX ON "school_class_students" USING btree ("school_class_id");
CREATE INDEX ON "school_class_students" USING btree ("student_id");