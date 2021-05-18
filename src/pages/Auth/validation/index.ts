import * as Yup from 'yup';

import { errorRequire } from 'utils/helper';

export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .required(errorRequire)
    .email(),
  password: Yup.string().required(errorRequire)
});

export const signUpSchema = Yup.object().shape({
  email: Yup.string()
    .required()
    .email(),
  first_name: Yup.string().required(errorRequire),
  last_name: Yup.string().required(errorRequire),
  password: Yup.string()
    .required(errorRequire)
    .min(8, 'Password must be 8 character Long'),
  phone_number: Yup.string().required(errorRequire),
  industry: Yup.string().required(errorRequire),
  confirm_password: Yup.string()
    .required(errorRequire)
    .oneOf([Yup.ref('password')], 'Your password do not match')
});

export const PasswordResetSchema = Yup.object().shape({
  password: Yup.string().required(errorRequire),
  passwordConfirmation: Yup.string()
    .required(errorRequire)
    .oneOf([Yup.ref('password')], 'Your password do not match')
});

export const forgetPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .required(errorRequire)
    .email()
});

export const changePasswordSchema = Yup.object().shape({
  current_password: Yup.string().required(errorRequire),
  new_password: Yup.string()
    .required(errorRequire)
    .min(8, 'Password must be 8 character Long')
    .notOneOf([Yup.ref('current_password')], 'You have entered same password! Please choose a different password')
});
