// test/user.controller.test.ts
import { Response } from 'supertest';
import app from '../app';
import User from '../database/models/user';
import request from 'supertest';

describe('User Controller', () => {
    beforeAll(async () => {
        await User.sync({ force: true });
    });

    afterEach(async () => {
        await User.destroy({ where: {} });
    });

    test('POST /users', async () => {
        const userData = {
            name: 'John Doe',
            email: 'john@example.com',
            password: 'password',
            role: 'buyer',
        };

        const res: Response = await request(app).post('/users').send(userData);
        expect(res.status).toBe(201);
        expect(res.body.name).toBe(userData.name);
        expect(res.body.email).toBe(userData.email);
        expect(res.body.password).toBe(userData.password);
        expect(res.body.role).toBe(userData.role);
    });

    test('GET /users', async () => {
        const user = await User.create({
            name: 'John Doe',
            email: 'john@example.com',
            password: 'password',
            role: 'buyer',
        });

        const res: Response = await request(app).get('/users');
        expect(res.status).toBe(200);
        expect(res.body).toBeInstanceOf(Array);
        expect(res.body[0].name).toBe(user.name);
        expect(res.body[0].email).toBe(user.email);
        expect(res.body[0].password).toBe(user.password);
        expect(res.body[0].role).toBe(user.role);
    });

    test('PUT /users/:id', async () => {
        const user = await User.create({
            name: 'John Doe',
            email: 'john@example.com',
            password: 'password',
            role: 'buyer',
        });

        const updatedData = {
            name: 'Jane Doe',
            email: 'jane@example.com',
            password: 'newpassword',
            role: 'seller',
        };

        const res: Response = await request(app)
            .put(`/users/${user.id}`)
            .send(updatedData);
        expect(res.status).toBe(200);
        expect(res.body.name).toBe(updatedData.name);
        expect(res.body.email).toBe(updatedData.email);
        expect(res.body.password).toBe(updatedData.password);
        expect(res.body.role).toBe(updatedData.role);
    });

    test('DELETE /users/:id', async () => {
        const user = await User.create({
            name: 'John Doe',
            email: 'john@example.com',
            password: 'password',
            role: 'buyer',
        });

        const res: Response = await request(app).delete(`/users/${user.id}`);
        expect(res.status).toBe(200);
        expect(res.body.message).toBe('User deleted.');

        const deletedUser = await User.findByPk(user.id);
        expect(deletedUser).toBeNull();
    });
});
