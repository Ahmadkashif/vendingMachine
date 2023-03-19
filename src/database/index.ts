import { DataSource, DataSourceOptions } from "typeorm";
import { user } from "./entity/User";

const options: DataSourceOptions = {
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "password_P12345",
    database: "testDb",
    synchronize: true,
    logging: true,
    entities: [user],
    subscribers: [],
    migrations: [],

}

export const db = new DataSource(options);