import { Sequelize } from 'sequelize-typescript';

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'password_P12345',
  database: 'testdb',
  models: [__dirname + '/models'], // Update this path to point to your Sequelize models folder
});

export default sequelize;
