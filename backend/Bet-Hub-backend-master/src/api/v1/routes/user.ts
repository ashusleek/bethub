import { Router, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { celebrate, Joi } from 'celebrate';

import { isAuth } from 'api/middlewares/auth';
import { createUser, changePassword } from 'api/v1/controllers/user';

const router = Router();

router.get('/', isAuth, (req: Request, res: Response) => {
  if (res.locals?.loggedInUser) {
    res.status(StatusCodes.OK).json(res.locals.loggedInUser);
  }
});

router.post(
  '/',
  isAuth,
  celebrate({
    body: Joi.object({
      email: Joi.string().required(),
      password: Joi.string().required(),
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
    }),
  }),
  createUser,
);

router.patch(
  '/password/change',
  isAuth,
  celebrate({
    body: Joi.object({
      newPassword: Joi.string().required(),
      currentPassword: Joi.string().required(),
    }),
  }),
  changePassword,
);

export default router;
