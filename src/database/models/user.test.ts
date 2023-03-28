import { Sequelize } from 'sequelize-typescript';
import User from './user';

const sequelize = new Sequelize({
  dialect: 'mysql',
  storage: ':memory:',
  models: [User],
});

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe('User model', () => {
  test('should create a user', async () => {
    const user = await User.create({
      username: 'testuser',
      password: 'testpassword',
      role: 'buyer',
    });

    expect(user.id).toBeDefined();
    expect(user.name).toBe('testuser');
    expect(user.password).toBe('testpassword');
    expect(user.role).toBe('buyer');
  });
});
