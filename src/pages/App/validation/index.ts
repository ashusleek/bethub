import * as Yup from 'yup';

export const addShipperSchema = Yup.object().shape({
  description: Yup.string().required(),
  slug: Yup.string().required(),
  timezone: Yup.string().required(),
  credentials: Yup.object().shape({
    account_number: Yup.string().required(),
    passphrase: Yup.string().required(),
    return_instructions: Yup.string().required()
  }),
  address: Yup.object().shape({
    country: Yup.string().required()
  })
});

export const addCredentialSchema = Yup.object().shape({
  name: Yup.string().required(),
  client_id: Yup.string().required(),
  client_secret: Yup.string().required()
});

export const addPostmenKeySchema = Yup.object().shape({
  name: Yup.string().required(),
  key: Yup.string().required()
});
