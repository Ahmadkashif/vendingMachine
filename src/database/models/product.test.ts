// src/__tests__/models/product.test.ts
import { Sequelize } from 'sequelize-typescript';
import User from './user';
import Product from './product';

const sequelize = new Sequelize({
  dialect: 'mysql',
  storage: ':memory:',
  models: [User, Product],
});

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe('Product model', () => {
  let user: User;

  beforeAll(async () => {
    user = await User.create({
      username: 'testuser',
      password: 'testpassword',
      role: 'seller',
    });
  });

  test('should create a product', async () => {
    const product = await Product.create({
      productName: 'Test Product',
      cost: 100,
      amountAvailable: 10,
      sellerId: user.id,
    });

    expect(product.id).toBeDefined();
    expect(product.name).toBe('Test Product');
    expect(product.cost).toBe(100);
    expect(product.units).toBe(10);
    expect(product.sellerId).toBe(user.id);
  });
});
