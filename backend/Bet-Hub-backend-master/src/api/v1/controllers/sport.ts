import { Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import { StatusCodes } from 'http-status-codes';

import { ILogger } from 'interfaces';
import SportService from 'services/sport';

export const getSports = async (req: Request, res: Response, next: NextFunction) => {
  const logger: ILogger = Container.get('logger');
  logger.debug('Calling Get-Odds endpoint %o');
  try {
    const sportServiceInstance = Container.get(SportService);
    const { sports } = await sportServiceInstance.GetSports();
    return res.status(StatusCodes.OK).json(sports);
  } catch (e) {
    return next(e);
  }
};

export const getSportEvents = async (req: Request, res: Response, next: NextFunction) => {
  const logger: ILogger = Container.get('logger');
  logger.debug('Calling Refresh_token endpoint with body: %o');
  try {
    const { sports, region } = req.body;
    const sportServiceInstance = Container.get(SportService);
    const events = await sportServiceInstance.GetSportEvents(sports, region);
    return res.status(StatusCodes.OK).json(events);
  } catch (e) {
    return next(e);
  }
};
