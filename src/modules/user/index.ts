import { UserRepository } from './repositories/userRepository';
import { UserService } from './services/userService';
import { UserController } from './controllers/userController';

const userRepo = new UserRepository();
const userService = new UserService(userRepo);
const userController = new UserController(userService);

export { userController };
