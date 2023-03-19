import { DataSource, DataSourceOptions } from "typeorm";

const options: DataSourceOptions = {
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "password_P12345",
    database: "vendingMachine",
    synchronize: true,
    logging: true,
    entities: [],
    subscribers: [],
    migrations: [],

}

export const db = new DataSource(options);