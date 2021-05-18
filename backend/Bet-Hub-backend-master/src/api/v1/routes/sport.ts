import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { isAuth } from 'api/middlewares/auth';
import { getSports, getSportEvents } from 'api/v1/controllers/sport';

const router = Router();

router.get('/', isAuth, getSports);

router.post(
  '/events',
  isAuth,
  celebrate({
    body: Joi.object({
      region: Joi.string().required(),
    }).unknown(),
  }),
  getSportEvents,
);

export default router;
