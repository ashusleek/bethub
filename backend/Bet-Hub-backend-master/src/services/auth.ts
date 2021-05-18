import { Response } from 'express';

import jwt from 'jsonwebtoken';
import { Service, Inject } from 'typedi';

import config from 'config';
import CustomError from 'helpers/utils/error';
import { U_ERROR_CODES, U_ERRORS } from 'helpers/statusCodes';
import { comparePasswords } from 'helpers/common';
import { IUser } from 'interfaces';
import { EventDispatcher, EventDispatcherInterface } from 'decorators/eventDispatcher';
import events from 'subscribers/events';

@Service()
export default class AuthService {
  constructor(
    @Inject('logger') private logger,
    @Inject('userModel') private userModel: Models.UserModel,
    @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
  ) {}

  public async SignIn(email: string, password: string): Promise<{ user: IUser; access: string; refresh: string }> {
    try {
      const currentUser: IUser = await this.userModel.findOne({ email });
      if (!currentUser) throw new CustomError(U_ERROR_CODES.NOT_FOUND).fieldEnumError(U_ERRORS);
      await this.matchPasswords(password, currentUser.password);

      this.logger.silly('Password is valid! Generating JWTs');
      const access = this.generateTokens(currentUser, 'access');
      const refresh = this.generateTokens(currentUser, 'refresh');
      this.logger.silly('Setting Cookies for JWTs');

      /**Dispatching event for lastLogin */
      this.eventDispatcher.dispatch(events.user.signIn, currentUser._id);

      return { user: currentUser, access, refresh };
    } catch (e) {
      throw e;
    }
  }

  public async refreshToken(res: Response): Promise<{ access: string; refresh: string }> {
    if (!res.locals.loggedInUser) {
      throw new Error('User is not logged in');
    }
    const { loggedInUser } = res.locals;
    this.logger.silly('Generating JWTs');
    const access = this.generateTokens(loggedInUser, 'access');
    const refresh = this.generateTokens(loggedInUser, 'refresh');
    this.logger.silly('Setting Cookies for JWTs');
    /**
     * setting tokens in response cookie
     * making it easier for token handling
     */
    res.cookie('access', access, { maxAge: 1000 * 60 * 60 }); // would expire after 60 secs
    res.cookie('refresh', refresh, { maxAge: 1000 * 60 * 60 * 24 }); // would expire after 1 day
    return { access, refresh };
  }

  private generateTokens(user: IUser, kind?: string) {
    const today = new Date();
    const exp = new Date(today);
    if (kind === 'access') exp.setDate(today.getDate() + 60);
    else if (kind === 'refresh') exp.setDate(today.getDate() + 60 * 60 * 24);
    else exp.setDate(today.getDate() + 60 * 60 * 24);
    /**
     * A JWT means JSON Web Token, so basically it's a json that is _hashed_ into a string
     * The cool thing is that you can add custom properties a.k.a metadata
     * Here we are adding the userId, role and name
     * Beware that the metadata is public and can be decoded without _the secret_
     * but the client cannot craft a JWT to fake a userId
     * because it doesn't have _the secret_ to sign it
     * more information here: https://softwareontheroad.com/you-dont-need-passport
     */
    this.logger.silly(`Sign JWT for user: ${user.email}`);
    return jwt.sign(
      {
        userId: user._id, // We are gonna use this in the middleware 'isAuth'
        exp: exp.getTime() / 1000,
      },
      config.jwtSecret,
    );
  }

  private async matchPasswords(unHashedPassword: string, hashedPassword: string): Promise<Error | boolean> {
    /**
     * We use verify from bcrypt to prevent 'timing based' attacks
     */
    this.logger.silly('Checking password');
    const validPassword = await comparePasswords(unHashedPassword, hashedPassword);
    if (!validPassword) throw new CustomError(U_ERROR_CODES.INVALID_PASSWORD).fieldEnumError(U_ERRORS);
    return true;
  }
}
