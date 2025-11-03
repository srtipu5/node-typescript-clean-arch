import { Router } from 'express';
import { asyncHandler, validateBody } from '../../../../core/middlewares';
import { buildingDto } from '../dtos';
import { AiController } from './aiController';

const aiController = new AiController();

const router = Router();

router.post(
  '/predict-ls-fee',
  validateBody(buildingDto),
  asyncHandler(aiController.analyzeBuildingData.bind(aiController)),
);

export default router;
