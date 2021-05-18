import mongoose from 'mongoose';
import { USER_STATUSES } from 'helpers/constants';

export interface IUser {
  _id?: mongoose.Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  status?: string;
  salt?: string;
  resetPasswordToken?: string;
  verificationCode?: string;
  isDeleted?: boolean;
}

export interface IUserInputDTO {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  resetPasswordToken?: string;
  verificationCode?: string;
}

const User = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: Object.values(USER_STATUSES),
    },
    resetPasswordToken: String,
    verificationCode: String,
    salt: String,
    lastLogin: { type: Date },
  },
  { timestamps: true },
);

export default mongoose.model<IUser & mongoose.Document>('users', User);
