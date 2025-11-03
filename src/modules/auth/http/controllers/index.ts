import { Router } from 'express';
// import { validateBody } from '../../../../core/middlewares';
// import { upadateTokenDto } from '../dtos';
import { authenticate, asyncHandler } from '../../../../core/middlewares';
import { MicrosoftController } from './microsoftController';
import { TokenMgtController } from './tokenMgtController';
import { msService, jwtService } from '../../../../core/services';
import { userRepo } from '../../../../core/repositorys';

const msController = new MicrosoftController(msService, jwtService, userRepo);
// const tokenMgtController = new TokenMgtController(jwtService, userRepo);

const router = Router();

router.post('/login', asyncHandler(msController.generateAuthUrl.bind(msController)));
router.post('/verify-code', asyncHandler(msController.verifyCode.bind(msController)));

// test
router.get('/callback', asyncHandler(msController.testFrontendProxy.bind(msController)));
router.get('/emails', authenticate, asyncHandler(msController.getEmails.bind(msController)));
// router.post('/refresh-token', asyncHandler(msController.refreshToken.bind(msController)));
// router.get('/mail', asyncHandler(msController.redirectToClient.bind(msController)));
// router.get('/events', asyncHandler(msController.redirectToClient.bind(msController)));
// router.get('/files', asyncHandler(msController.redirectToClient.bind(msController)));
// router.put('/file-upload', asyncHandler(msController.redirectToClient.bind(msController)));

// router.post(
//   '/update-token',
//   validateBody(upadateTokenDto),
//   asyncHandler(tokenMgtController.updateToken.bind(tokenMgtController)),
// );

export default router;
