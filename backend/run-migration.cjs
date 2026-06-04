require('ts-node/register');
require('dotenv').config();
const { DataSource } = require('typeorm');
const path = require('path');

const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "5432", 10),
    username: process.env.DB_USERNAME || "postgres",
    password: process.env.DB_PASSWORD || "postgres",
    database: process.env.DB_DATABASE || process.env.DB_NAME || "okgym",
    entities: [path.join(__dirname, "src/models/**/*.ts")],
    migrations: [path.join(__dirname, "src/migrations/**/*.ts")],
});

AppDataSource.initialize()
    .then(async () => {
        console.log("Running pending migrations...");
        try {
            await AppDataSource.runMigrations();
            console.log("Migrations completed successfully");
        } catch (error) {
            console.error("Error during migration:", error);
        }
        process.exit(0);
    })
    .catch((error) => {
        console.error("Error initializing database:", error);
        process.exit(1);
    }); 