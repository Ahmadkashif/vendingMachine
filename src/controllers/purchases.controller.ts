import { Request, Response, RequestHandler } from "express";
import Purchase from "../database/models/purchases";
import User from "../database/models/user";
import Product from "../database/models/product";

export class PurchaseController {

    public static add: RequestHandler = async (req: Request, res: Response) => {
        try {
            const { userId, productId, quantity } = req.body;

            if (!userId || !productId || !quantity)
                return res.status(400).json({ message: "Missing required fields." });

            const user = await User.findByPk(userId);
            if (!user) return res.status(404).json({ message: "User not found." });

            const product = await Product.findByPk(productId);
            if (!product) return res.status(404).json({ message: "Product not found." });

            const totalCost = product.cost * quantity;

            const purchase = await Purchase.create({
                userId,
                productId,
                quantity,
                totalCost,
            });

            res.status(201).json(purchase);
        } catch (error) {
            res.status(500).json({ message: "Failed to create purchase.", error });
        }
    };

    public static update: RequestHandler = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const { userId, productId, quantity } = req.body;

            const purchase = await Purchase.findByPk(id);

            if (!purchase) {
                res.status(404).json({ message: "Purchase not found." });
                return;
            }

            if (userId) {
                const user = await User.findByPk(userId);
                if (!user) return res.status(404).json({ message: "User not found." });
                purchase.userId = userId;
            }

            if (productId) {
                const product = await Product.findByPk(productId);
                if (!product) return res.status(404).json({ message: "Product not found." });
                purchase.productId = productId;
            }

            if (quantity) {
                purchase.quantity = quantity;
                const product = await Product.findByPk(purchase.productId);
                if (product) {
                    purchase.totalCost = product.cost * quantity;
                }
            }

            await purchase.save();
            res.status(200).json(purchase);
        } catch (error) {
            res.status(500).json({ message: "Failed to update purchase.", error });
        }
    };

    public static delete: RequestHandler = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;

            const purchase = await Purchase.findByPk(id);

            if (!purchase)
                return res.status(404).json({ message: "Purchase not found." });

            await purchase.destroy();
            res.status(200).json({ message: "Purchase deleted." });
        } catch (error) {
            res.status(500).json({ message: "Failed to delete purchase.", error });
        }
    };
}
