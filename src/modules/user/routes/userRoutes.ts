import { Router } from 'express';
import { UserService } from '../services/userService';
import { UserController } from '../controllers/userController';
import { asyncHandler } from '../../../shared/utils/asyncHandler';
import { CreateUserSchema } from '../dtos/createUserDto';
import { validateBody } from '../../../shared/middlewares';

const router = Router();
const controller = new UserController(new UserService());

router.get('/', asyncHandler(controller.getUsers.bind(controller)));

// router.post(
//   '/register',
//   validateBody(CreateUserSchema),
//   asyncHandler(controller.register.bind(controller)),
// );

export default router;
