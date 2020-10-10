import mongoose, { Document, Schema  } from 'mongoose';
import { IUser, IUserAttached } from './user.model';

export const UserCollectionName = 'Users';

const UserSchema = new Schema({
  userEmail: {
    type: String,
    required: true
  },
  lastLoggedIn: {
      type: Date,
  },

});

export interface IUserDocument extends IUser, Document {}

export const UserCollection = 
mongoose.model<IUserDocument>(UserCollectionName, UserSchema);

export const mapUserToAttachedUser = (user: IUserDocument | null): IUserAttached | null => {
  if (user) {
    return {
      id: user.id,
      email: user.email,
      lastLoggedIn: user.lastLoggedIn
    };
  } else return null;
};
