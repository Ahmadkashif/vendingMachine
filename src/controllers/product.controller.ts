import { Request, Response, RequestHandler } from "express";
import Product from "../database/models/product";
import User from "../database/models/user";

export class ProductController {

    public static add: RequestHandler = async (req: Request, res: Response) => {

        try {
            const { name, units, cost, sellerId } = req.body;

            if (!name || !units || !cost || !sellerId)
                return res.status(400).json({ message: 'Missing required fields.' });

            const seller = await User.findByPk(sellerId);

            if (!seller)
                return res.status(404).json({ message: 'Seller not found.' });

            const product = await Product.create({ name, units, cost, sellerId });
            res.status(201).json(product);

        } catch (error) {
            res.status(500).json({ message: 'Failed to create product.', error });
        }
    };

    public static get: RequestHandler = async (req: Request, res: Response) => {

        try {
            const products = await Product.findAll({ include: [User] });
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ message: 'Failed to fetch products.', error });
        }

    };

    public static update: RequestHandler = async (req: Request, res: Response) => {

        try {
            const { id } = req.params;
            const { name, units, cost, sellerId } = req.body;

            const product = await Product.findByPk(id);

            if (!product) {
                res.status(404).json({ message: 'Product not found.' });
                return;
            }

            if (name) product.name = name;
            if (units) product.units = units;
            if (cost) product.cost = cost;
            if (sellerId) {
                const seller = await User.findByPk(sellerId);
                if (!seller) {
                    res.status(404).json({ message: 'Seller not found.' });
                    return;
                }
            }

            await product.save();
            res.status(200).json(product);
        } catch (error) {
            res.status(500).json({ message: 'Failed to update product.', error });
        }

    };

    public static delete: RequestHandler = async (req: Request, res: Response) => {

        try {
            const { id } = req.params;

            const product = await Product.findByPk(id);

            if (!product)
                return res.status(404).json({ message: 'Product not found.' });

            await product.destroy();
            res.status(200).json({ message: 'Product deleted.' });
        } catch (error) {
            res.status(500).json({ message: 'Failed to delete product.', error });
        }
        
    };
};
