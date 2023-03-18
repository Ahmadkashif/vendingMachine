import { DataSource, DataSourceOptions } from "typeorm";

const options: DataSourceOptions = {
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "userA",
    password: "password",
    database: "vendingMachine",
    synchronize: true,
    logging: true,
    entities: [],
    subscribers: [],
    migrations: [],
}

export const db = new DataSource(options);