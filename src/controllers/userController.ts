import { Request, Response } from "express";
import { db } from "../database/index.test";
import { user } from "../database/entity/User";

const userRepository = db.getRepository(user);
export class UserController {

    
    public static add = async (req: Request, res: Response) => {
        try {            
            const {username, password, deposit} = req.body;
            const newUser = new user(username, password, deposit);
            await userRepository.save(newUser);
            res.send("successfully saved")
        } catch (error) {
            res.send(error);
        }
    };
    public static get = async (req: Request, res: Response) => {
        try {
            const allUsers = await userRepository.find();
            console.log(allUsers);
            res.send("successful");
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    };
    public static update = (req: Request, res: Response) => {

    };
    public static delete = (req: Request, res: Response) => {

    };
};