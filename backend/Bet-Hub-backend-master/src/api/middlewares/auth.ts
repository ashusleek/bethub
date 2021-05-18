import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { Container } from 'typedi';

import { IUser, ILogger } from 'interfaces';
import { ERROR_NAMES } from 'helpers/constants';
import config from 'config';

/**
 * We are assuming that the JWT will come in a header with the form
 *
 * But it could come in a cookie with the name that you want like
 * Luckily this API follow _common sense_ ergo a _good design_ and don't allow that ugly stuff
 */
enum TOKEN_TYPES {
  REFRESH,
  ACCESS,
}

const getTokenFromHeader = (req: Request, res: Response, type: number) => {
  /**
   * @TODO Edge and Internet Explorer do some weird things with the headers
   * So I believe that this should handle more 'edge' cases ;)
   */
  let token = null;
  if (type === TOKEN_TYPES.ACCESS) token = req.headers.access || req.cookies.access;
  else token = req.headers.refresh || req.cookies.refresh;

  if (token) {
    const { userId } = jwt.verify(token, config.jwtSecret);
    res.locals.userId = userId;
    return true;
  }
  return false;
};

/**
 * Attach user to res.locals.loggedInUser
 * @param {*} req Express req Object
 * @param {*} res  Express res Object
 * @param {*} next  Express next Function
 */
export const attachCurrentUser = async (req: Request, res: Response, next: NextFunction) => {
  const Logger: ILogger = Container.get('logger');
  try {
    const UserModel: Models.UserModel = Container.get('userModel');
    let userFilter = null;
    if (res.locals.userId) {
      userFilter = { _id: res.locals.userId };
    } else if (req.headers?.email) {
      userFilter = { email: req.headers.email };
    }
    const currentUser = await UserModel.findOne(userFilter)
      .select('-password -salt -actication_code')
      .lean()
      .exec();
    if (!currentUser) throw new Error('Invalid Current User');
    res.locals.loggedInUser = currentUser;
    return next();
  } catch (e) {
    Logger.error('🔥 Error attaching user to req: %o', e);
    next(e);
  }
};

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
  /**
   * calling getTokenFromHeader for checking
   * if token is passed for further request
   * process, if yes, proceed further otherwise
   * cancel request with understandable message
   */
  try {
    if (!getTokenFromHeader(req, res, TOKEN_TYPES.ACCESS)) throw new Error('Invalid Access Token');
    attachCurrentUser(req, res, next);
  } catch (e) {
    e.name = ERROR_NAMES.UNAUTHORIZE;
    throw e;
  }
};

export const canRefreshToken = (req: Request, res: Response, next: NextFunction) => {
  /**
   * calling this for checking if we have
   * refresh token in headers or cookie
   */
  try {
    if (!getTokenFromHeader(req, res, TOKEN_TYPES.REFRESH)) throw new Error('Invalid Refresh Token');
    attachCurrentUser(req, res, next);
  } catch (e) {
    e.name = ERROR_NAMES.UNAUTHORIZE;
    throw e;
  }
};
