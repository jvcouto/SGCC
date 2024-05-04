

module.exports = {
    type: "postgres",
    host: process.env.DB_HOST ?? "localhost",
    port:  process.env.DB_PORT ?? 5432,
    username: process.env.DB_USER ?? "postgres",
    password:  process.env.DB_PASSWORD ?? "postgres",
    database:  process.env.DB_DATABASE ?? "postgres",
    entities: process.env.NODE_ENV === 'PROD' ? [`dist/models/*.js`] : ["src/models/*.ts"],
    migrations: ["src/database/migrations/*.ts"],
    synchronize: true,
    cli: {
        migrationsDir: "src/database/migrations",
        entitiesDir: "src/models"
    },
    extra: {
        ssl: {
          rejectUnauthorized: false,
        },
    }
}
