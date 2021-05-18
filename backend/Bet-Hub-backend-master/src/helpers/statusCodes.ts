import { StatusCodes } from 'http-status-codes';

export enum U_ERROR_CODES {
  NOT_FOUND = 'NOT_FOUND',
  NOT_ACTIVE = 'NOT_ACTIVE',
  ALREADY_ACTIVATED = 'ALREADY_ACTIVATED',
  INVALID_PASSWORD = 'INVALID_PASSWORD',
  DELETED = 'DELETED',
}

export const U_ERRORS = {
  [U_ERROR_CODES.NOT_FOUND]: {
    message: 'User Not Found',
    status: StatusCodes.NOT_FOUND,
    key: 'email',
  },
  [U_ERROR_CODES.NOT_ACTIVE]: {
    message: 'User Not Active',
    status: StatusCodes.OK,
  },
  [U_ERROR_CODES.ALREADY_ACTIVATED]: {
    message: 'User Already Activated',
    status: StatusCodes.BAD_REQUEST,
  },
  [U_ERROR_CODES.INVALID_PASSWORD]: {
    message: 'Incorrect Password',
    status: StatusCodes.UNAUTHORIZED,
    key: 'password',
  },
  [U_ERROR_CODES.DELETED]: {
    message: 'user has been Deleted by Admin',
    status: StatusCodes.FORBIDDEN,
  },
};
