/* eslint-disable @typescript-eslint/no-unused-vars */
import { Document, Model } from 'mongoose';

import { IUser } from 'interfaces';
declare global {
  namespace Express {
    export interface Response {
      locals: {
        // loggedInUser: IUser & Document;
      };
    }
  }

  namespace Models {
    export type UserModel = Model<IUser & Document>;
  }
}
