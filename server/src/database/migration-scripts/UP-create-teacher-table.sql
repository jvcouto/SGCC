CREATE TABLE IF NOT EXISTS "teacher" (
    "id" BIGINT PRIMARY KEY,
    "name" VARCHAR(50),
    "course" VARCHAR(50),
    "email" VARCHAR(50),
    "password" VARCHAR(50),
    "created_at" TIMESTAMP,
    "updated_at" TIMESTAMP,
    UNIQUE(email)
);