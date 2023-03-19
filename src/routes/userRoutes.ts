import { Router } from 'express';
import {UserController} from '../controllers/userController';

export const userRoutes = Router();

userRoutes.post('/', UserController.add);
// userRoutes.get('/:id', UserController.get);
userRoutes.get('/', UserController.get);
userRoutes.put('/:id', UserController.update);
userRoutes.delete('/:id', UserController.delete);


