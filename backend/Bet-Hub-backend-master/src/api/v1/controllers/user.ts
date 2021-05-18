import { Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import { StatusCodes } from 'http-status-codes';

import { ILogger } from 'interfaces';
import UserService from 'services/user';

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const logger: ILogger = Container.get('logger');
  logger.debug('Calling Sign-In endpoint with body: %o', req.body);
  try {
    const userServiceInstance = Container.get(UserService);
    const user = await userServiceInstance.SignUp(req.body);
    return res.status(StatusCodes.CREATED).json(user);
  } catch (e) {
    return next(e);
  }
};

export const changePassword = async (req: Request, res: Response, next: NextFunction) => {
  const { loggedInUser } = res.locals;
  const logger: ILogger = Container.get('logger');
  logger.debug('Calling Change-Password endpoint with body: %o', req.body);
  try {
    const userServiceInstance = Container.get(UserService);
    const result = await userServiceInstance.changePassword(loggedInUser, req.body);
    return res.status(StatusCodes.OK).send(result);
  } catch (e) {
    return next(e);
  }
};
