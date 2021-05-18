import { IError } from 'interfaces';
import { StatusCodes } from 'http-status-codes';

/**
 * @param err: mongoose generated error
 */
const mongooseErrors = (err: Partial<IError.ICustomError>): IError.IGenericFormat => {
  let mErrors;
  if (err.errors) {
    mErrors = err.errors;
    Object.keys(err.errors).forEach(error => {
      mErrors[error] = err.errors[error].message;
    });
  } else if (err.message.includes('duplicate')) {
    const field = err.message
      .split('index:')[1]
      .split(' ')[1]
      .split('_')[0];
    mErrors = {};
    mErrors[field] = `${err.message.split('{')[1].split('}')[0]} already exists`;
  } else {
    mErrors = err.message;
  }
  return { message: mErrors, status: StatusCodes.BAD_REQUEST };
};

/**
 * @param err: error generated by Joi celebrates
 */
const fieldError = (err: Partial<IError.ICustomError>): IError.IGenericFormat => {
  let fErrors = {};
  if (err.errors) {
    Object.keys(err.errors).forEach(error => {
      fErrors[error.split('.')[0]] = err.errors[error].message;
    });
    return { message: fErrors, status: StatusCodes.BAD_REQUEST };
  } else if (err.message && err.message.includes('child')) {
    const field = err.details[0].path[0];
    fErrors[field] = err.details[0].message;
    return { message: fErrors, status: StatusCodes.BAD_REQUEST };
  } else if (err.message.includes('allowed')) {
    return { message: err.message, status: StatusCodes.BAD_REQUEST };
  } else {
    return { message: err.message.split(':')[2], status: StatusCodes.BAD_REQUEST };
  }
};

/**
 * @param err: global generated error
 * @returns {message: string | object, status: StatusCodes}
 * forwarding to specific module error formatter
 */
export const formatError = (err: Partial<IError.ICustomError>) => {
  if (err.name === 'MongoError') {
    return mongooseErrors(err);
  } else if (err.name === 'ValidationError') {
    return fieldError(err);
  } else return { message: err.message, status: err.status };
};