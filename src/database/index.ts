import User from './models/user';
import Product from './models/product';
import Purchases from './models/purchases';
import { Sequelize } from 'sequelize-typescript';


const connection = new Sequelize({
  dialect: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'password_P12345',
  database: 'testDb',
  models: [User, Product, Purchases], 
});

export default connection;
