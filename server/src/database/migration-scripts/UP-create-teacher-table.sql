CREATE TABLE IF NOT EXISTS "teacher" (
    "id" BIGSERIAL PRIMARY KEY,
    "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(),
    "name" VARCHAR(128) NOT NULL,
    "course" VARCHAR(128) NOT NULL,
    "email" VARCHAR(50) NOT NULL UNIQUE,
    "password" VARCHAR(256) NOT NULL,
    "created_at" TIMESTAMP NULL DEFAULT NULL,
    "updated_at" TIMESTAMP NULL DEFAULT NULL
);