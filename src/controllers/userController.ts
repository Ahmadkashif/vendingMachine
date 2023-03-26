import { Request, Response, RequestHandler } from "express";
import { db } from "../database/index.test";
import { User } from "../database/entity/User";

export class UserController {


    public static add: RequestHandler = async (req: Request, res: Response) => {
        try {
            const { name, email, password } = req.body;
            const newUser = await User.create({ name, email, password })
            return res.send("successfully saved")
        } catch (error) {
            return res.send(error);
        }
    };
    public static get: RequestHandler = async (req: Request, res: Response) => {
        try {
            const getAll = await User.findAll();
            return res.json(getAll);
        } catch (error) {
            console.log(error);
            return res.send(error)
        }
    };
    public static update: RequestHandler = (req: Request, res: Response) => {

    };
    public static delete: RequestHandler = (req: Request, res: Response) => {

    };
};