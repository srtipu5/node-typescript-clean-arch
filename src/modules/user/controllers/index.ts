import { UserController } from './userController';
import { userService } from '../services';

const userController = new UserController(userService);

export { userController };
