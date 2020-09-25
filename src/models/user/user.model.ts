import { IBaseModelAttached } from '../base-model';

export interface IUser {

  /** A user's email */
  userEmail: string;

  /** A date when a user was last time logged in */
  lastLoggedIn: Date;

}

export type IUserAttached = IUser & IBaseModelAttached;