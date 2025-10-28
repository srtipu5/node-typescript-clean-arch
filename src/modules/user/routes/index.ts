import { Router } from 'express';
import { createUserSchema } from '../dtos/createUserDto';
import { asyncHandler } from '../../../core/utils';
import { validateBody } from '../../../core/middlewares';
import { userController } from '..';

const router = Router();

router.get('/', asyncHandler(userController.getUsers.bind(userController)));

router.post(
  '/register',
  validateBody(createUserSchema),
  asyncHandler(userController.register.bind(userController)),
);

export default router;
