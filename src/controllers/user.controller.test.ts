import { Request, Response } from "express";
import { UserController } from "../controllers/user.controller";
import User from "../database/models/user";

// Mock response object
const mockResponse = () => {
    const res: Partial<Response> = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};

// Mock request object
const mockRequest = (body: any, params: any = {}): Partial<Request> => ({
    body,
    params,
});

const mockNext = jest.fn();

describe("UserController", () => {
    beforeAll(async () => {
        await User.sync({ force: true });
    });

    afterEach(async () => {
        await User.destroy({ where: {} });
    });

    test("should create a user", async () => {
        const req = mockRequest({
            name: "User 1",
            email: "user1@example.com",
            password: "password",
            role: "buyer",
        });
        const res = mockResponse();

        await UserController.add(req as Request, res as Response, mockNext);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalled();
    });

    test("should get all users", async () => {
        await User.create({ name: "User 1", email: "user1@example.com", password: "password", role: "buyer" });

        const req = mockRequest({});
        const res = mockResponse();

        await UserController.get(req as Request, res as Response, mockNext);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalled();
    });

    test("should update a user", async () => {
        const user = await User.create({ name: "User 1", email: "user1@example.com", password: "password", role: "buyer" });

        const req = mockRequest(
            {
                name: "Updated User",
                email: "updateduser@example.com",
                password: "newpassword",
                role: "seller",
            },
            { id: user.id }
        );
        const res = mockResponse();

        await UserController.update(req as Request, res as Response, mockNext);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalled();
    });

    test("should delete a user", async () => {
        const user = await User.create({ name: "User 1", email: "user1@example.com", password: "password", role: "buyer" });

        const req = mockRequest({}, { id: user.id });
        const res = mockResponse();

        await UserController.delete(req as Request, res as Response, mockNext);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalled();
    });
});
