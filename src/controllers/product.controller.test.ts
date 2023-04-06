import { Request, Response } from "express";
import { ProductController } from "../controllers/product.controller";
import Product from "../database/models/product";
import User from "../database/models/user";

const mockResponse = () => {
    const res: Partial<Response> = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};

const mockRequest = (body: any, params: any = {}): Partial<Request> => ({
    body,
    params,
});

const mockNext = jest.fn();

describe("ProductController", () => {
    beforeAll(async () => {
        await Product.sync({ force: true });
        await User.sync({ force: true });
    });

    afterEach(async () => {
        await Product.destroy({ where: {} });
        await User.destroy({ where: {} });
    });

    test("should create a product", async () => {
        const user = await User.create({ name: "Seller", email: "seller@example.com", password: "password", role: "seller" });

        const req = mockRequest({
            name: "Product 1",
            units: 10,
            cost: 100,
            sellerId: user.id,
        });
        const res = mockResponse();

        await ProductController.add(req as Request, res as Response, mockNext);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalled();
    });

    test("should get all products", async () => {
        const user = await User.create({ name: "Seller", email: "seller@example.com", password: "password", role: "seller" });
        await Product.create({ name: "Product 1", units: 10, cost: 100, sellerId: user.id });

        const req = mockRequest({});
        const res = mockResponse();

        await ProductController.get(req as Request, res as Response, mockNext);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalled();
    });

    test("should update a product", async () => {
        const user = await User.create({ name: "Seller", email: "seller@example.com", password: "password", role: "seller" });
        const product = await Product.create({ name: "Product 1", units: 10, cost: 100, sellerId: user.id });

        const req = mockRequest(
            {
                name: "Updated Product",
                units: 20,
                cost: 200,
            },
            { id: product.id }
        );
        const res = mockResponse();

        await ProductController.update(req as Request, res as Response, mockNext);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalled();
    });

    test("should delete a product", async () => {
        const user = await User.create({ name: "Seller", email: "seller@example.com", password: "password", role: "seller" });
        const product = await Product.create({ name: "Product 1", units: 10, cost: 100, sellerId: user.id });

        const req = mockRequest({}, { id: product.id });
        const res = mockResponse();

        await ProductController.delete(req as Request, res as Response, mockNext);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalled();
    });
});