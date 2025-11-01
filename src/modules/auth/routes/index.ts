import { Router } from 'express';
import { asyncHandler } from '../../../core/utils';
import { validateBody } from '../../../core/middlewares';
import { upadateTokenDto } from '../dtos';
import { msAuthController, tokenMgtController } from '../index';

const router = Router();

router.get('/ms/login', asyncHandler(msAuthController.redirectToMicrosoft.bind(msAuthController)));
router.get('/ms/callback', asyncHandler(msAuthController.redirectToClient.bind(msAuthController)));
router.post(
  '/update-token',
  validateBody(upadateTokenDto),
  asyncHandler(tokenMgtController.updateToken.bind(tokenMgtController)),
);

export default router;
