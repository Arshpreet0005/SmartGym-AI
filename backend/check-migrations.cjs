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
    database: process.env.DB_NAME || "okgym",
    entities: [path.join(__dirname, "src/models/**/*.ts")],
    migrations: [path.join(__dirname, "src/migrations/**/*.ts")],
});

AppDataSource.initialize()
    .then(async () => {
        const pendingMigrations = await AppDataSource.showMigrations();
        console.log("Pending migrations:", pendingMigrations);
        process.exit(0);
    })
    .catch((error) => {
        console.error("Error checking migrations:", error);
        process.exit(1);
    }); 