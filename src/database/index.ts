import { Sequelize } from 'sequelize-typescript';
import { User } from './models/user';

const connection = new Sequelize({
  dialect: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'password_P12345',
  database: 'testDb',
  models: [User], // Update this path to point to your Sequelize models folder
});

export default connection;
