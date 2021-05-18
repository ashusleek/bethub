import * as Yup from 'yup';

export const companySchema = Yup.object().shape({
  name: Yup.string().required(),
  investment: Yup.number().required(),
  companyId: Yup.number().required()
});

export const suggestionSchema = Yup.object().shape({
  title: Yup.string().required(),
  description: Yup.string().required()
});

export const userSchema = Yup.object().shape({
  firstName: Yup.string().required(),
  lastName: Yup.string().required(),
  email: Yup.string().required(),
  password: Yup.string().required()
});

export const newsSchema = Yup.object().shape({
  title: Yup.string().required()
});

export const changePasswordSchema = Yup.object().shape({
  // email: Yup.string().required(),
  currentPassword: Yup.string().required(),
  newPassword: Yup.string().required()
});
