import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { sendData, sendError } from '../../../../core/utils';
import { BuildingDto } from '../dtos';
import { config } from '../../../../config';
import axios from 'axios';

export class AiController {
  constructor() {}

  async analyzeBuildingData(req: Request, res: Response) {
    try {
      const response = await axios.post(`${config.AI_PRICE_ESTIMATOR_SERVICE_URL}/predict-ls-fee`, {
        ...(req.body as BuildingDto),
      });

      sendData(res, { ...response.data });
    } catch (error) {
      console.log(error);
      sendError(res, {
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        message: 'Something went wrong',
      });
    }
  }
}
