export default {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'password_P12345',
    database: 'testDb',
    synchronize: true,
    "entities": [
        "src/database/entity/*.ts"
    ],
    // "migrations": [
    //      "database/migrations/**/*.ts"
    // ],
    // "subscribers": [
    //     "src/subscriber/**/*.ts"
    // ],
    // "cli": {
    //     "entitiesDir": "src/entity",
    //     "migrationsDir": "database/migrations",
    //     "subscribersDir": "src/subscriber"
    // }
};