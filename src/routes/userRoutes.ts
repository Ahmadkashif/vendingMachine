import { Router } from 'express';
import {UserController} from '../controllers/userController';

export const userRoutes = Router();

userRoutes.post('/user', UserController.add);
userRoutes.get('/user/:id', UserController.get);
userRoutes.get('/users', UserController.get);
userRoutes.put('/user/:id', UserController.update);
userRoutes.delete('/user/:id', UserController.delete);

