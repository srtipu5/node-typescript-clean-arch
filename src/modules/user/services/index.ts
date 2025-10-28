import { UserRepository } from '../repositories/userRepository';
import { UserService } from '../services/userService';

const userRepo = new UserRepository();
const userService = new UserService(userRepo);

export { userService };
