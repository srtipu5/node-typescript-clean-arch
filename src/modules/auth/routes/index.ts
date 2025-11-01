import { Router } from 'express';
import { asyncHandler } from '../../../core/utils';
import { validateBody } from '../../../core/middlewares';
import { upadateTokenDto } from '../dtos';
import { msController, tokenMgtController } from '../index';

const router = Router();

router.get('/login', asyncHandler(msController.redirectToMicrosoft.bind(msController)));
router.get('/callback', asyncHandler(msController.redirectToClient.bind(msController)));
router.post('/refresh-token', asyncHandler(msController.redirectToClient.bind(msController)));
router.get('/profile', asyncHandler(msController.redirectToClient.bind(msController)));
router.get('/mail', asyncHandler(msController.redirectToClient.bind(msController)));
router.get('/events', asyncHandler(msController.redirectToClient.bind(msController)));
router.get('/files', asyncHandler(msController.redirectToClient.bind(msController)));
router.put('/file-upload', asyncHandler(msController.redirectToClient.bind(msController)));

// router.post(
//   '/update-token',
//   validateBody(upadateTokenDto),
//   asyncHandler(tokenMgtController.updateToken.bind(tokenMgtController)),
// );

export default router;
