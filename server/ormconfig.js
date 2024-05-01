module.exports = {
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "postgres",
    entities: ["src/models/*.ts"],
    migrations: ["src/database/migrations/*.ts"],
    synchronize: true,
    cli: {
        migrationsDir: "src/database/migrations",
        entitiesDir: "src/models"
    }
}
