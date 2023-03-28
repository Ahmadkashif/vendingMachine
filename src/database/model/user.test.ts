import { db } from "@database";
import { User } from '@database/entity/user';

describe('User Entity', () => {
  let connection: Connection;
  const manager: ConnectionManager = getConnectionManager();

  beforeAll(async () => {
    connection = await manager.create({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'your_username',
      password: 'your_password',
      database: 'your_database',
      synchronize: true,
      entities: [User],
    });
    await connection.connect();
  });

  afterAll(async () => {
    await connection.close();
  });

  beforeEach(async () => {
    await connection.getRepository(User).clear();
  });

  test('should create a new user', async () => {
    const userRepository = connection.getRepository(User);
    const newUser = userRepository.create({
      username: 'testuser',
      password: 'testpassword',
      deposit: 0,
      role: 'buyer',
    });

    await userRepository.save(newUser);

    const savedUser = await userRepository.findOne({ username: 'testuser' });
    expect(savedUser).toBeDefined();
    expect(savedUser?.username).toEqual('testuser');
    expect(savedUser?.password).toEqual('testpassword');
    expect(savedUser?.deposit).toEqual(0);
    expect(savedUser?.role).toEqual('buyer');
  });

  // Add more tests here for other CRUD operations and any additional requirements
});
