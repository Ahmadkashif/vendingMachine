import { Request, Response, RequestHandler } from "express";
import User from "../database/models/user";

export class UserController {


    public static add: RequestHandler = async (req: Request, res: Response) => {
        try {

            const { name, email, password, role } = req.body;

            if (!name || !email || !password || !role)
                return res.status(400).json({ message: 'Missing required fields.' });

            const user = await User.create({ name, email, password, role });
            res.status(201).json(user);

        } catch (error) {
            res.status(500).json({ message: 'Failed to create user.', error });
        }
    };

    public static get: RequestHandler = async (req: Request, res: Response) => {
        try {
            const users = await User.findAll();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ message: 'Failed to fetch users.', error });
        }
    };

    public static update: RequestHandler = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const { name, email, password, role } = req.body;

            const user = await User.findByPk(id);

            if (!user) {
                res.status(404).json({ message: 'User not found.' });
                return;
            }

            if (name) user.name = name;
            if (email) user.email = email;
            if (password) user.password = password;
            if (role) user.role = role;

            await user.save();
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ message: 'Failed to update user.', error });
        }
    };

    public static delete: RequestHandler = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;

            const user = await User.findByPk(id);

            if (!user)
                return res.status(404).json({ message: 'User not found.' });

            await user.destroy();
            res.status(200).json({ message: 'User deleted.' });
        } catch (error) {
            res.status(500).json({ message: 'Failed to delete user.', error });
        }
    };
};