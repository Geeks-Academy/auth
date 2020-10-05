import { IBaseModelAttached } from '../base-model';

export interface IUser {

  /** A user's email */
  userEmail: string;

  /** A date when a user was last time logged in */
  lastLoggedIn: Date;

}

export type IUserAttached = IUser & IBaseModelAttached;

export interface GoogleUser {
  id: string;
  displayName: string;
  name: { 
    familyName: string; 
    givenName: string; 
  };
  emails: { value: string; verified: boolean }[];
  photos: {value: string}[];
  provider: string;
  _raw: string;
  _json: {
    sub: string;
    name: string;
    given_name: string;
    family_name: string;
    picture: string;
    email: string;
    email_verified: boolean;
    locale: string;
  }
}