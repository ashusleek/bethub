import { celebrate, Joi } from 'celebrate';

const joiCelebrates = {
  userSignup: celebrate({
    body: Joi.object({
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.string()
        .email()
        .required(),
      password: Joi.string()
        .min(8)
        .required(),
    }).unknown(true),
  }),
  userActivate: celebrate({
    body: Joi.object({
      email: Joi.string()
        .email()
        .required(),
    }),
  }),
  login: celebrate({
    body: Joi.object({
      email: Joi.string().required(),
      password: Joi.string().required(),
    }),
  }),
  changePassword: celebrate({
    body: Joi.object({
      current_password: Joi.string().required(),
      new_password: Joi.string().required(),
    }),
  }),
  resetPassword: celebrate({
    body: Joi.object({
      email: Joi.string().required(),
    }),
  }),
  resetPasswordConfirm: celebrate({
    body: Joi.object({
      new_password: Joi.string().required(),
    }),
  }),
};

export default joiCelebrates;
