import { Service, Inject } from 'typedi';

import { hashPassword, comparePasswords } from 'helpers/common';
import { IUser, IUserInputDTO } from 'interfaces';
import CustomError from 'helpers/utils/error';
import { U_ERROR_CODES, U_ERRORS } from 'helpers/statusCodes';

@Service()
export default class UserService {
  constructor(@Inject('logger') private logger, @Inject('userModel') private userModel: Models.UserModel) {}

  public async SignUp(user: IUserInputDTO): Promise<IUser> {
    try {
      this.logger.silly(`Creating User..`);
      const hashedPassword = await hashPassword(user.password);
      const newUser: IUser = await this.userModel.create({ ...user, password: hashedPassword });
      if (!newUser) throw new Error('User could not be registered');

      this.logger.silly('User registered Successfully');
      return newUser;
    } catch (e) {
      throw e;
    }
  }

  public async changePassword(loggedInUser: IUser, passwords): Promise<string> {
    try {
      const { currentPassword, newPassword } = passwords;
      const userRecord = await this.userModel.findById(loggedInUser._id);
      this.logger.silly('Verifying current password');
      await this.matchPasswords(currentPassword, userRecord.password);

      this.logger.silly('Hashing new password');
      const hashedPassword = await hashPassword(newPassword);
      this.logger.silly('Updating user password');
      const newUserRecord = await this.userModel
        .findByIdAndUpdate(userRecord._id, {
          password: hashedPassword,
        })
        .select('-password -salt')
        .lean()
        .exec();
      if (!newUserRecord) {
        throw new Error('User Password could not update');
      }
      this.logger.silly('🔥 Password updated successfully');
      return 'Password updated!';
    } catch (e) {
      throw e;
    }
  }

  private async matchPasswords(unHashedPassword: string, hashedPassword: string): Promise<Error | boolean> {
    /**
     * We use verify from bcrypt to prevent 'timing based' attacks
     */
    this.logger.silly('Checking password');
    const validPassword = await comparePasswords(unHashedPassword, hashedPassword);
    if (!validPassword) throw new CustomError(U_ERROR_CODES.INVALID_PASSWORD).fieldEnumError(U_ERRORS);
    return true;
  }
}
