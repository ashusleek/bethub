import { Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import { StatusCodes } from 'http-status-codes';

import { ILogger } from 'interfaces';
import AuthService from 'services/auth';

export const signin = async (req: Request, res: Response, next: NextFunction) => {
  const logger: ILogger = Container.get('logger');
  logger.debug('Calling Sign-In endpoint with body: %o', req.body);
  try {
    const { email, password } = req.body;
    const authServiceInstance = Container.get(AuthService);
    const { user, access, refresh } = await authServiceInstance.SignIn(email, password);
    /**
     * setting tokens in response cookie
     * making it easier for token handling
     */
    res.cookie('access', access, { maxAge: 1000 * 60 * 60 * 24 }); // would expire after 1 day
    res.cookie('refresh', refresh, { maxAge: 1000 * 60 * 60 * 24 }); // would expire after 1 day
    return res.status(StatusCodes.OK).json({ user, access, refresh });
  } catch (e) {
    return next(e);
  }
};

export const refreshToken = async (req: Request, res: Response, next: NextFunction) => {
  const logger: ILogger = Container.get('logger');
  logger.debug('Calling Refresh_token endpoint with body: %o');
  try {
    const authServiceInstance = Container.get(AuthService);
    const { access, refresh } = await authServiceInstance.refreshToken(res);
    return res.status(StatusCodes.OK).json({ access, refresh });
  } catch (e) {
    return next(e);
  }
};
