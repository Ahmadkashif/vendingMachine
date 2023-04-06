import { Router } from 'express';
import {UserController} from '../controllers/user.controller';

const UserRouter = Router();

UserRouter.post('/', UserController.add);
// userRoutes.get('/:id', UserController.get);
UserRouter.get('/', UserController.get);
UserRouter.put('/:id', UserController.update);
UserRouter.delete('/:id', UserController.delete);

export default UserRouter;